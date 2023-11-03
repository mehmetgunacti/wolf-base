import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bookmark, Click, LocalStorageService, TAG_POPULAR, commaSplit, toggleArrayItem } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { from, fromEventPattern, iif, of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { clickTag, emptySelectedTags, search, setSelectedTags } from 'store/actions/bookmark-tags.actions';
import { togglePopular } from 'store/actions/bookmark-ui.actions';
import { clickBookmark, createBookmark, createBookmarkSuccess, deleteBookmark, deleteBookmarkSuccess, loadAllBookmarksSuccess, loadAllClicksSuccess, updateBookmark, updateBookmarkFailure, updateBookmarkSuccess } from 'store/actions/bookmark.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class BookmarkEntitiesEffects {

	private actions$: Actions = inject(Actions);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	loadBookmarks$ = createEffect(

		() => fromEventPattern<Bookmark[]>(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.localStorage.bookmarks.list()).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(bookmarks => loadAllBookmarksSuccess({ bookmarks }))
		)

	);

	loadClicks$ = createEffect(

		() => fromEventPattern<Click[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listClicks()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(clicks => loadAllClicksSuccess({ clicks }))
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

	bookmarksCreate$ = createEffect(

		() => this.actions$.pipe(

			ofType(createBookmark),
			map(param => param.bookmark),
			switchMap(bookmark => this.localStorage.bookmarks.create(bookmark)),
			map((bookmark: Bookmark) => createBookmarkSuccess({ bookmark }))

		)

	);

	bookmarksShowCreateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(createBookmarkSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Bookmark created' }))

		)

	);

	bookmarksUpdate$ = createEffect(

		() => this.actions$.pipe(

			ofType(updateBookmark),
			switchMap(({ id, bookmark }) => from(this.localStorage.bookmarks.update(id, bookmark)).pipe(
				switchMap(count => iif(

					() => count === 1,
					from(this.localStorage.bookmarks.getEntity(id)).pipe(
						map(bookmark => bookmark ? updateBookmarkSuccess({ bookmark }) : updateBookmarkFailure({ id }))
					),
					of(updateBookmarkFailure({ id }))

				))

			))

		)

	);

	bookmarksShowUpdateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(updateBookmarkSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Bookmark updated' }))

		)

	);

	bookmarkTogglePopularTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(togglePopular),
			tap(({ id }) => this.localStorage.bookmarks.toggleTag(id, TAG_POPULAR))

		),
		{ dispatch: false }

	);

	bookmarksDelete$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteBookmark),
			map(p => p.id),
			switchMap(id => this.localStorage.bookmarks.moveToTrash(id)),
			map(() => deleteBookmarkSuccess())

		)

	);

	bookmarkDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteBookmarkSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Bookmark deleted' }))

		)

	);

	bookmarksClick$ = createEffect(

		() => this.actions$.pipe(

			ofType(clickBookmark),
			switchMap(({ id }) => from(this.localStorage.bookmarks.click(id)))

		),
		{ dispatch: false }

	);

}
