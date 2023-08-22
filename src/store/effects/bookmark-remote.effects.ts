import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { LocalStorageService, RemoteMetadata, RemoteStorageService, SyncData } from 'lib';
import { fromEventPattern } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { doanloadRemoteMetadata, doanloadRemoteMetadataSuccess, loadRemoteMetadataSuccess, loadSyncDataSuccess, loadTrashCountSuccess } from 'store/actions/bookmark-sync.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class BookmarkRemoteEffects {

	private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	loadBookmarksRemoteData$ = createEffect(

		() => fromEventPattern<RemoteMetadata[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listRemoteMetadata()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(remoteMetadata => loadRemoteMetadataSuccess({ remoteMetadata }))
		)

	);

	downloadBookmarkRemoteData$ = createEffect(

		() => this.actions$.pipe(

			ofType(doanloadRemoteMetadata),
			switchMap(() => this.remoteStorage.bookmarks.downloadIds()),
			switchMap(remoteMetadata => this.localStorage.bookmarks.putRemoteMetadata(remoteMetadata)),
			map(remoteMetadata => doanloadRemoteMetadataSuccess())

		)

	);

	showDownloadSuccessMessage$ = createEffect(

		() => this.actions$.pipe(

			ofType(doanloadRemoteMetadataSuccess),
			map(() => showNotification({severity: 'info', detail: 'Bookmark Ids downloaded'}))

		)

	);

}
