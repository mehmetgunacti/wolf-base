import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { liveQuery } from 'dexie';
import { Bookmark, LocalStorageService } from 'lib';
import { fromEventPattern, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { showNotification } from 'store';
import * as fromActions from '../actions';

@Injectable()
export class BookmarksEffects {

	constructor(
		private actions$: Actions,
		private localStorage: LocalStorageService
	) { }

	listFromIndexedDb$ = createEffect(

		() => this.localStorage.bookmarks.list$({
			orderBy: 'clicks',
			reverse: true,
			limit: 50
		}).pipe(
			map((bookmarks) => fromActions.loadAllBookmarksSuccess({ bookmarks }))
		)

	);

	// bookmarksLoadAll$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(fromActions.bookmarksLoadAll),
	// 		switchMap(() => this.localStorage.bookmarks.list({
	// 			orderBy: 'clicks',
	// 			reverse: true,
	// 			limit: 50
	// 		})),
	// 		map(bookmarks => fromActions.bookmarksLoadAllSuccess({ bookmarks }))

	// 	)

	// );

	// bookmarksRemoveAll$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(fromActions.bookmarksActionRemoveAll),
	// 		map(() => fromActions.bookmarksActionLoadAllSuccess({ bookmarks: [] }))

	// 	)

	// );

	bookmarksSearch$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.searchBookmarks),
			map(p => p.term),
			switchMap(term => this.localStorage.bookmarks.search(term)),
			map(bookmarks => fromActions.searchBookmarksSuccess({ bookmarks }))

		)

	);

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
