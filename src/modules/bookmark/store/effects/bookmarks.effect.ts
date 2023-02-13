import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalStorageService, successNotification } from 'lib';
import { map, switchMap, tap } from 'rxjs/operators';
import { showNotification } from 'store';
import * as fromActions from '../actions';

@Injectable()
export class BookmarksEffects {

	constructor(
		private actions$: Actions,
		private localStorage: LocalStorageService
	) { }

	bookmarksLoadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksLoadAll),
			switchMap(async () => await this.localStorage.bookmarks.list({
				orderBy: 'clicks',
				reverse: true,
				limit: 50
			})),
			map(items => items.map(item => item.data)),
			map(bookmarks => fromActions.bookmarksLoadAllSuccess({ bookmarks }))

		)

	);

	bookmarksRemoveAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksRemoveAll),
			map(_ => fromActions.bookmarksLoadAllSuccess({ bookmarks: [] }))

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

	bookmarksUpsert$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.bookmarksUpsert),
			map(p => p.payload),
			tap(item => this.localStorage.bookmarks.save(item)),
			// tap(isUpdate => this.toastService.show({ type: W359ToastType.SUCCESS, message: `Bookmark ${isUpdate ? 'updated' : 'created'}` })),
			switchMap(() => [
				fromActions.bookmarksLoadAll(),
				showNotification({
					...successNotification,
					summary: `Bookmark isUpdate ? 'updated' : 'created'`
				})
			]),

		)

	);

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
