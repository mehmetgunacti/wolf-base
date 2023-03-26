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
			map((bookmarks) => fromActions.bookmarksLoadAllSuccess({bookmarks}))
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

	bookmarksRemoveAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksRemoveAll),
			map(() => fromActions.bookmarksLoadAllSuccess({ bookmarks: [] }))

		)

	);

	bookmarksSearch$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksSearch),
			map(p => p.term),
			switchMap(term => this.localStorage.bookmarks.search(term)),
			map(bookmarks => fromActions.bookmarksSearchSuccess({ bookmarks }))

		)

	);

	bookmarksSave$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksSave),
			map(param => param.bookmark),
			switchMap(bookmark => this.localStorage.bookmarks.save(bookmark)),
			map((bookmark: Bookmark) => fromActions.bookmarksSaveSuccess({ bookmark }))

		)

	);

	bookmarksShowSaveNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksSaveSuccess),
			map(param => param.bookmark),
			map((bookmark: Bookmark) => showNotification({
				severity: 'success',
				detail: `Bookmark ${bookmark.created ? 'created' : 'updated'}`
			}))

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

			ofType(fromActions.bookmarksDelete),
			map(p => p.id),
			tap(id => this.localStorage.bookmarks.moveToTrash(id)),
			// tap(() => this.toastService.show({ type: W359ToastType.SUCCESS, message: `Bookmark deleted` })),
			map(() => fromActions.bookmarksLoadAll())

		)

	);

	bookmarksClick$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksClick),
			map(p => p.payload),
			switchMap(bookmark => this.localStorage.bookmarks.click(bookmark.id)),

		),
		{ dispatch: false }

	);

	tagsToggleSelected$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.tagsToggleSelected),
			map(p => p.ids),
			switchMap(ids => this.localStorage.bookmarks.searchByTags(ids)),
			map(bookmarks => fromActions.bookmarksSearchSuccess({ bookmarks }))

		)

	);

}
