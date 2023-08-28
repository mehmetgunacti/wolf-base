import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService, RemoteStorageService } from 'lib';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { downloadRemoteClicks, downloadRemoteMetadata, downloadRemoteMetadataSuccess, downloadRemoteNew, partialDownloadSuccess, partialUploadSuccess, uploadLocalClicked, uploadLocalNew, uploadLocalUpdated, viewLocalDeletedRemoteDeleted, viewLocalDeletedRemoteDeletedSuccess, viewLocalDeletedRemoteUpdated, viewLocalDeletedRemoteUpdatedSuccess, viewLocalUntouchedRemoteDeleted, viewLocalUntouchedRemoteDeletedSuccess, viewLocalUntouchedRemoteUpdated, viewLocalUntouchedRemoteUpdatedSuccess, viewLocalUpdatedRemoteDeleted, viewLocalUpdatedRemoteDeletedSuccess, viewLocalUpdatedRemoteUpdated, viewLocalUpdatedRemoteUpdatedSuccess } from 'store/actions/stats-bookmark.actions';
import { selBookmarkClicked } from 'store/selectors/bookmark-entities.selectors';
import { selBookmarkLocalCreatedIds, selBookmarkLocalDeletedRemoteDeleted, selBookmarkLocalDeletedRemoteUntouched, selBookmarkLocalDeletedRemoteUpdated, selBookmarkLocalUpdatedRemoteDeleted, selBookmarkLocalUpdatedRemoteUntouched, selBookmarkLocalUpdatedRemoteUpdated, selBookmarkRemoteCreated, selBookmarkRemoteDeleted, selBookmarkRemoteUpdated } from 'store/selectors/stats-bookmark.selectors';

@Injectable()
export class StatsBookmarkEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	downloadBookmarkRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteMetadata),
			switchMap(() => this.remoteStorage.bookmarks.downloadIds()),
			switchMap(remoteMetadata => this.localStorage.bookmarks.putRemoteMetadata(remoteMetadata)),
			map(() => downloadRemoteMetadataSuccess())

		)

	);

	showDownloadSuccessMessage$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteMetadataSuccess),
			map(() => showNotification({ severity: 'info', summary: 'Download Complete', detail: 'Remote data refreshed' }))

		)

	);

	uploadLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadLocalUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteUntouched)),
			map(([, syncData]) => syncData.map(sd => sd.id)),
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

	uploadLocalDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadLocalUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteUntouched)),
			map(([, syncData]) => syncData.map(sd => sd.id)),
			switchMap(async ids => {

				for (const id of ids) {

					const localSyncData = await this.localStorage.bookmarks.getSyncData(id);
					if (localSyncData) {
						await this.remoteStorage.bookmarks.delete(localSyncData.id);
						await this.localStorage.bookmarks.deletePermanently(localSyncData.id);
					}

				}
				return ids.length;

			}),
			map(count => partialUploadSuccess({ count }))

		)

	);

	downloadRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteNew),
			withLatestFrom(this.store.select(selBookmarkRemoteCreated)),
			map(([, remoteMetadata]) => remoteMetadata.map(rmd => rmd.id)),
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
			withLatestFrom(this.store.select(selBookmarkLocalCreatedIds)),
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
			withLatestFrom(this.store.select(selBookmarkClicked)),
			map(([, clicks]) => clicks),
			switchMap(async clicks => {

				for (const click of clicks) {

					const total = await this.remoteStorage.clicks.increase(click.id, click.current);
					await this.localStorage.clicks.put({ ...click, total });

				}
				return clicks.length;

			}),
			map(count => partialUploadSuccess({ count }))

		)

	);

	downloadRemoteClicked$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteClicks),
			switchMap(async () => {

				const clicks = await this.remoteStorage.clicks.downloadMany();
				await this.localStorage.clicks.putAll(clicks);
				return clicks.length;

			}),
			map(count => partialDownloadSuccess({ count }))

		)

	);

	viewLocalUntouchedRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalUntouchedRemoteDeleted),
			withLatestFrom(this.store.select(selBookmarkRemoteDeleted)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(async (id) => {

				const syncData = await this.localStorage.bookmarks.getSyncData(id);
				const bookmark = await this.localStorage.bookmarks.get(id);
				return viewLocalUntouchedRemoteDeletedSuccess({ syncData, bookmark });

			})

		)

	);

	viewLocalUntouchedRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalUntouchedRemoteUpdated),
			withLatestFrom(this.store.select(selBookmarkRemoteUpdated)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(async (id) => {

				const syncData = await this.localStorage.bookmarks.getSyncData(id);
				const bookmark = await this.localStorage.bookmarks.get(id);
				const remoteMetadata = await this.localStorage.bookmarks.getRemoteMetadata(id);
				return viewLocalUntouchedRemoteUpdatedSuccess({ syncData, bookmark, remoteMetadata });

			})

		)

	);

	viewLocalUpdatedRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalUpdatedRemoteUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteUpdated)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(async (id) => {

				const syncData = await this.localStorage.bookmarks.getSyncData(id);
				const bookmark = await this.localStorage.bookmarks.get(id);
				const remoteMetadata = await this.localStorage.bookmarks.getRemoteMetadata(id);
				return viewLocalUpdatedRemoteUpdatedSuccess({ syncData, bookmark, remoteMetadata });

			})

		)

	);

	viewLocalDeletedRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalDeletedRemoteDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteDeleted)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(async (id) => {

				const syncData = await this.localStorage.bookmarks.getSyncData(id);
				const bookmark = await this.localStorage.bookmarks.get(id);
				return viewLocalDeletedRemoteDeletedSuccess({ syncData, bookmark });

			})

		)

	);

	viewLocalUpdatedRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalUpdatedRemoteDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteDeleted)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(async (id) => {

				const syncData = await this.localStorage.bookmarks.getSyncData(id);
				const bookmark = await this.localStorage.bookmarks.get(id);
				return viewLocalUpdatedRemoteDeletedSuccess({ syncData, bookmark });

			})

		)

	);

	viewLocalDeletedRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalDeletedRemoteUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteUpdated)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(async (id) => {

				const syncData = await this.localStorage.bookmarks.getSyncData(id);
				const bookmark = await this.localStorage.bookmarks.get(id);
				const remoteMetadata = await this.localStorage.bookmarks.getRemoteMetadata(id);
				return viewLocalDeletedRemoteUpdatedSuccess({ syncData, bookmark, remoteMetadata });

			})

		)

	);

}