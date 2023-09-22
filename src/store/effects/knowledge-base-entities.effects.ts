import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { KBEntry, LocalStorageService, POPULAR, RemoteStorageService, commaSplit, toggleArrayItem } from 'lib';
import { from, fromEventPattern, iif, of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { clickTag, emptySelectedTags, search, setSelectedTags, togglePopular } from 'store/actions/knowledge-base-tags.actions';
import { createKBEntry, createKBentrySuccess, deleteKBEntry, deleteKBEntrySuccess, loadAllKBEntriesSuccess, updateKBEntry, updateKBEntryFailure, updateKBEntrySuccess } from 'store/actions/knowledge-base.actions';

@Injectable()
export class KnowledgeBaseEntitiesEffects {

	private actions$: Actions = inject(Actions);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	loadBookmarks$ = createEffect(

		() => fromEventPattern<KBEntry[]>(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.localStorage.kbEntries.list()).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(kbEntries => loadAllKBEntriesSuccess({ kbEntries }))
		)

	);

	onTagClickSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(clickTag),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([{ name }, params]) => {

				// Toggle the clicked tag in the 'tags' query parameter array
				const tagsArr: string[] = toggleArrayItem(commaSplit(params['tags']), name);

				// Destructure 'tags' from the query parameters, keeping the rest of the parameters in 'rest'
				const { tags, ...rest } = params;

				// Create a new set of query parameters based on the toggled 'tagsArr'
				const queryParams: Params = tagsArr.length === 0 ? rest : { ...params, tags: tagsArr.join(',') };

				// Navigate to the current route with the updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	emptyURLTagsQueryParams$ = createEffect(

		() => this.actions$.pipe(

			ofType(emptySelectedTags),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([_, params]) => {

				// Destructure 'tags' from the query parameters, keeping the rest of the parameters in 'rest'
				const { tags, ...queryParams } = params;

				// Navigate to the current route with the updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	onQueryParamsChangeSetSelectedTags$ = createEffect(

		() => this.activatedRoute.queryParams.pipe(

			map(params => params['tags']),
			map((tags: string) => commaSplit(tags)),
			map(tags => setSelectedTags({ tags }))

		)

	);

	onSearchSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(search),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([{ term }, params]) => {

				// Destructure 'tags' from the query parameters, keeping the rest of the parameters in 'rest'
				const { search, ...rest } = params;

				// Create a new set of query parameters based on the toggled 'tagsArr'
				const queryParams: Params = term ? { ...params, search: term } : rest;

				// Navigate to the current route with the updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	onQueryParamsChangeSetSearch$ = createEffect(

		() => this.activatedRoute.queryParams.pipe(

			map(params => params['search']),
			filter(term => !!term),
			switchMap(term => of(search({ term })))

		)

	);

	createKBEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(createKBEntry),
			map(param => param.kbEntry),
			switchMap(kbEntry => this.localStorage.kbEntries.create(kbEntry)),
			map((kbEntry: KBEntry) => createKBentrySuccess({ kbEntry }))

		)

	);

	kbEntryShowCreateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(createKBentrySuccess),
			map(() => showNotification({ severity: 'success', summary: 'Knowledge Base', detail: 'Entry created' }))

		)

	);

	updateKBEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(updateKBEntry),
			switchMap(({ id, kbEntry }) => from(this.localStorage.kbEntries.update(id, kbEntry)).pipe(
				switchMap(count => iif(
					() => count === 1,
					from(this.localStorage.kbEntries.getEntity(id)).pipe(
						map(kbEntry => kbEntry ? updateKBEntrySuccess({ kbEntry }) : updateKBEntryFailure({ id }))
					),
					of(updateKBEntryFailure({ id }))
				))
			))
		)
	);

	kbEntryShowUpdateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(updateKBEntrySuccess),
			map(() => showNotification({ severity: 'success', summary: 'Knowledge Base', detail: 'Entry updated' }))

		)

	);

	kbEntryTogglePopularTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(togglePopular),
			tap(({ id }) => this.localStorage.kbEntries.toggleTag(id, POPULAR))

		),
		{ dispatch: false }

	);

	kbEntryDelete$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteKBEntry),
			map(p => p.id),
			switchMap(id => this.localStorage.kbEntries.moveToTrash(id)),
			map(() => deleteKBEntrySuccess())

		)

	);

	kbEntryDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteKBEntrySuccess),
			map(() => showNotification({ severity: 'success', summary: 'Knowledge Base', detail: 'Entry deleted' }))

		)

	);

}
