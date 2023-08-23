import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { LocalStorageService, RemoteMetadata, RemoteStorageService } from 'lib';
import { fromEventPattern } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { downloadRemoteMetadata, downloadRemoteMetadataSuccess, downloadRemoteNew, loadRemoteMetadataSuccess, partialDownloadSuccess, partialUploadSuccess, uploadLocalClicked, uploadLocalNew } from 'store/actions/bookmark-sync.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import { sltBookmarkClicked } from 'store/selectors/bookmark-entities.selectors';
import { sltBookmarkLocalCreatedIds, sltBookmarkRemoteCreatedIds } from 'store/selectors/bookmark-stats.selectors';

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
			map(() => showNotification({ severity: 'info', summary: 'Download Complete', detail: 'Bookmark data refreshed' }))

		)

	);

	downloadRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteNew),
			withLatestFrom(this.store.select(sltBookmarkRemoteCreatedIds)),
			map(([, ids]) => ids),
			switchMap(async ids => {
				const remoteData = await this.remoteStorage.bookmarks.downloadMany(ids);
				await this.localStorage.bookmarks.putAll(remoteData);
				return remoteData;
			}),
			map(remoteData => partialDownloadSuccess({ count: remoteData.length }))

		)

	);

	uploadLocalNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadLocalNew),
			withLatestFrom(this.store.select(sltBookmarkLocalCreatedIds)),
			map(([, ids]) => ids),
			switchMap(async ids => {

				for (const id of ids) {

					const localData = await this.localStorage.bookmarks.get(id);
					if (localData) {
						const uploaded = await this.remoteStorage.bookmarks.upload(localData);
						await this.localStorage.bookmarks.put(uploaded);
					}

				}
				return ids.length;
				
			}),
			map(count => partialDownloadSuccess({ count }))

		)

	);

	uploadLocalClicked$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadLocalClicked),
			withLatestFrom(this.store.select(sltBookmarkClicked)),
			map(([, clicks]) => clicks),
			switchMap(async clicks => {

				for (const click of clicks) {

					const total = await this.remoteStorage.clicks.increase(click.id, click.current);
					await this.localStorage.clicks.put({ ... click, total });

				}
				return clicks.length;
				
			}),
			map(count => partialUploadSuccess({ count }))

		)

	);

	partialDownloadSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(partialDownloadSuccess),
			map(({ count }) => showNotification({ severity: 'success', summary: 'Download Complete', detail: `${count} items downloaded` }))

		)

	);

	partialuploadSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(partialUploadSuccess),
			map(({ count }) => showNotification({ severity: 'success', summary: 'Upload Complete', detail: `${count} items uploaded` }))

		)

	);

}
