import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { LocalStorageService, SyncData } from 'lib';
import { fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';
import { syncSuccess, trashCountSuccess } from 'store/actions/bookmark-sync.actions';

@Injectable()
export class BookmarkSyncEffects {

	// private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	loadBookmarksSyncData$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listSyncData()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(syncData => syncSuccess({ syncData }))
		)

	);

	trashCount$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listDeletedItems()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(items => trashCountSuccess({ count: items.length }))
		)

	);

}
