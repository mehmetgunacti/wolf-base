import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { LocalStorageService, SyncData } from 'lib';
import { fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookmarkActions } from 'store/actions';

@Injectable()
export class SyncEffects {

	// private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	loadBookmarksSyncData$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listSyncData()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(syncData => BookmarkActions.Sync.syncSuccess({ syncData }))
		)

	);

	trashCount$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listDeletedItems()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(items => BookmarkActions.Sync.trashCountSuccess({ count: items.length }))
		)

	);

}
