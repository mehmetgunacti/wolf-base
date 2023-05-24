import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Bookmark, LocalStorageService } from 'lib';
import { of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { showNotification } from 'store';
import { commaSplit, toggleArrayItem } from 'utils';
import * as fromActions from '../actions';

@Injectable()
export class BookmarksEffects {

	private actions$: Actions = inject(Actions);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	listFromIndexedDb$ = createEffect(

		() => this.localStorage.bookmarks.list$({
			orderBy: 'clicks',
			reverse: true
		}).pipe(
			map((bookmarks) => fromActions.loadAllBookmarksSuccess({ bookmarks }))
		)

	);

	onTagClickSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.clickTag),
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

			ofType(fromActions.emptySelectedTags),
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
			switchMap(tags => of(fromActions.setSelectedTags({ tags })))

		)

	);

	onSearchSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.search),
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
			switchMap(term => of(fromActions.search({ term })))

		)

	);

	// bookmarksRemoveAll$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(fromActions.bookmarksActionRemoveAll),
	// 		map(() => fromActions.bookmarksActionLoadAllSuccess({ bookmarks: [] }))

	// 	)

	// );

	// bookmarksSearch$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(fromActions.searchBookmarks),
	// 		map(p => p.term),
	// 		switchMap(term => this.localStorage.bookmarks.search(term)),
	// 		map(bookmarks => fromActions.searchBookmarksSuccess({ bookmarks }))

	// 	)

	// );

	bookmarksCreate$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.createBookmark),
			map(param => param.bookmark),
			switchMap(bookmark => this.localStorage.bookmarks.create(bookmark)),
			map((bookmark: Bookmark) => fromActions.createBookmarkSuccess({ bookmark }))

		)

	);

	bookmarksShowCreateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.createBookmarkSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Bookmark created' }))

		)

	);

	bookmarksUpdate$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.updateBookmark),
			switchMap(({ id, bookmark }) => this.localStorage.bookmarks.update(id, bookmark)),
			map((bookmark: Bookmark) => fromActions.updateBookmarkSuccess({ bookmark }))

		)

	);

	bookmarksShowUpdateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.updateBookmarkSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Bookmark updated' }))

		)

	);

	// bookmarksReloadAllBookmarks$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(fromActions.bookmarksSaveSuccess),
	// 		tap(() => console.log('reloading all')),
	// 		map(() => fromActions.bookmarksLoadAll())

	// 	)

	// );

	bookmarksDelete$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.deleteBookmark),
			map(p => p.id),
			tap(id => this.localStorage.bookmarks.delete(id)),
			// tap(() => this.toastService.show({ type: W359ToastType.SUCCESS, message: `Bookmark deleted` })),
			// map(() => fromActions.bookmarksActionLoadAll())

		),
		{ dispatch: false }

	);

	bookmarksClick$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.clickBookmark),
			map(p => p.payload),
			tap(bookmark => this.localStorage.bookmarks.click(bookmark.id))

		),
		{ dispatch: false }

	);

	// tagsToggleSelected$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(fromActions.tagsToggleSelected),
	// 		map(p => p.id),
	// 		switchMap(ids => this.localStorage.bookmarks.searchByTags(ids)),
	// 		map(bookmarks => fromActions.bookmarksSearchSuccess({ bookmarks }))

	// 	)

	// );

}
