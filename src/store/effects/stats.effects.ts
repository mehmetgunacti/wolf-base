import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { Bookmark, RemoteData } from 'lib';
import { filter, map, switchMap } from 'rxjs/operators';
import { LocalStorageService, RemoteStorageService } from 'lib';
import { showNotification } from 'store/actions/core-notification.actions';
import { downloadRemoteData, downloadRemoteDataFailure, downloadRemoteDataSuccess, overrideLocalItem, overrideRemoteItem, partialDownloadSuccess, partialUploadSuccess, purgeLocalItem, purgeRemoteItem } from 'store/actions/stats-bookmark.actions';

@Injectable()
export class StatsEffects {

	private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	downloadRemoteData$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteData),
			switchMap(({ id }) => this.remoteStorage.bookmarks.downloadOne(id)),
			map(remoteData => remoteData ? downloadRemoteDataSuccess({ remoteData }) : downloadRemoteDataFailure())

		)

	);

	showNoRemoteDataNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteDataSuccess),
			filter(remoteData => remoteData === null),
			map(() => showNotification({ severity: 'info', detail: 'No RemoteData found' }))

		)

	);

	purgeLocalItem$ = createEffect(

		() => this.actions$.pipe(

			ofType(purgeLocalItem),
			switchMap(({ id }) => this.localStorage.bookmarks.deletePermanently(id)),
			map(() => showNotification({ severity: 'success', detail: 'Local item deleted' }))

		)

	);

	purgeRemoteItem$ = createEffect(

		() => this.actions$.pipe(

			ofType(purgeRemoteItem),
			switchMap(({ id }) => this.remoteStorage.bookmarks.moveToTrash(id)),
			map(() => showNotification({ severity: 'success', detail: 'Remote item deleted' }))

		)

	);

	overrideLocalItem$ = createEffect(

		() => this.actions$.pipe(

			ofType(overrideLocalItem),
			switchMap(({ remoteData }) => this.localStorage.bookmarks.put(remoteData as RemoteData<Bookmark>)),
			map(() => showNotification({ severity: 'success', detail: 'Local item updated' }))

		)

	);

	overrideRemoteItem$ = createEffect(

		() => this.actions$.pipe(

			ofType(overrideRemoteItem),
			switchMap(({ entity }) => this.remoteStorage.bookmarks.upload(entity as Bookmark)),
			switchMap(remoteData => this.localStorage.bookmarks.put(remoteData)),
			map(() => showNotification({ severity: 'success', detail: 'Remote item updated' }))

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