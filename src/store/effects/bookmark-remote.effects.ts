import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { LocalStorageService, RemoteMetadata, RemoteStorageService } from 'lib';
import { fromEventPattern } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { downloadRemoteMetadata, downloadRemoteMetadataSuccess, downloadRemoteNew, partialDownloadSuccess, loadRemoteMetadataSuccess } from 'store/actions/bookmark-sync.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import { selectorBookmarkRemoteCreatedIds } from 'store/selectors/bookmark-stats.selectors';

@Injectable()
export class BookmarkRemoteEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
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

	downloadBookmarkRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteMetadata),
			switchMap(() => this.remoteStorage.bookmarks.downloadIds()),
			switchMap(remoteMetadata => this.localStorage.bookmarks.putRemoteMetadata(remoteMetadata)),
			map(remoteMetadata => downloadRemoteMetadataSuccess())

		)

	);

	showDownloadSuccessMessage$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteMetadataSuccess),
			map(() => showNotification({ severity: 'info', detail: 'Bookmark Ids downloaded' }))

		)

	);

	downloadRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteNew),
			withLatestFrom(this.store.select(selectorBookmarkRemoteCreatedIds)),
			map(([, ids]) => ids),
			switchMap(async ids => {
				const remoteData = await this.remoteStorage.bookmarks.downloadMany(ids);
				await this.localStorage.bookmarks.putAll(remoteData);
				return remoteData;
			}),
			map(remoteData => partialDownloadSuccess({ count: remoteData.length }))

		)

	);

	partialDownloadSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(partialDownloadSuccess),
			map(({ count }) => showNotification({ severity: 'info', summary: 'Download Complete', detail: `${count} items downloaded` }))

		)

	);

}
