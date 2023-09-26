import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { LocalStorageService, RemoteMetadata, SyncData } from '@lib';
import { fromEventPattern } from 'rxjs';
import { map } from 'rxjs/operators';
import { loadRemoteMetadataSuccess, loadSyncDataSuccess, loadTrashCountSuccess } from 'store/actions/bookmark.actions';

@Injectable()
export class BookmarkLocalStorageEffects {

	// private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	// private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	loadBookmarksSyncData$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listSyncData()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(syncData => loadSyncDataSuccess({ syncData }))
		)

	);

	loadBookmarksRemoteData$ = createEffect(

		() => fromEventPattern<RemoteMetadata[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listRemoteMetadata()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(remoteMetadata => loadRemoteMetadataSuccess({ remoteMetadata }))
		)

	);

	loadTrashCount$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listDeletedItems()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(items => loadTrashCountSuccess({ count: items.length }))
		)

	);

}
