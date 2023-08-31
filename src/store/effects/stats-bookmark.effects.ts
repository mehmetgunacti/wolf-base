import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { Bookmark, SyncData } from 'lib';
import { combineLatest, from } from 'rxjs';
import { filter, map, switchMap, toArray, withLatestFrom } from 'rxjs/operators';
import { LocalStorageService, RemoteStorageService } from 'lib';
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

	uploadLocalNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadLocalNew),
			withLatestFrom(this.store.select(selBookmarkLocalCreatedIds)),
			map(([, ids]) => ids),
			switchMap(ids => from(ids).pipe(
				switchMap(id => from(this.localStorage.bookmarks.get(id)).pipe(
					filter((bookmark): bookmark is Bookmark => bookmark !== null),
					switchMap(bookmark => this.remoteStorage.bookmarks.upload(bookmark).pipe(
						switchMap(uploaded => from(this.localStorage.bookmarks.put(uploaded)).pipe(
							map(() => id)
						))
					))
				)),
			)),
			toArray(),
			map(ids => ids.length),
			map(count => partialDownloadSuccess({ count }))

		)

	);

	// todo: same as uploadLocalNew$
	uploadLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadLocalUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteUntouched)),
			map(([, syncData]) => syncData.map(sd => sd.id)),
			switchMap(ids => from(ids).pipe(
				switchMap(id => from(this.localStorage.bookmarks.get(id)).pipe(
					filter((bookmark): bookmark is Bookmark => bookmark !== null),
					switchMap(bookmark => this.remoteStorage.bookmarks.upload(bookmark).pipe(
						switchMap(uploaded => from(this.localStorage.bookmarks.put(uploaded)).pipe(
							map(() => id)
						))
					))
				)),
			)),
			toArray(),
			map(ids => ids.length),
			map(count => partialDownloadSuccess({ count }))

		)

	);

	uploadLocalDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadLocalUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteUntouched)),
			map(([, syncData]) => syncData.map(sd => sd.id)),
			switchMap(ids => from(ids).pipe(
				switchMap(id => from(this.localStorage.bookmarks.getSyncData(id)).pipe(
					filter((syncData): syncData is SyncData => syncData !== null),
					switchMap(syncData => this.remoteStorage.bookmarks.delete(syncData.id).pipe(
						switchMap(() => from(this.localStorage.bookmarks.deletePermanently(syncData.id)).pipe(
							map(() => syncData.id)
						))
					))
				)),
			)),
			toArray(),
			map(ids => ids.length),
			map(count => partialUploadSuccess({ count }))

		)

	);

	downloadRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteNew),
			withLatestFrom(this.store.select(selBookmarkRemoteCreated)),
			map(([, remoteMetadata]) => remoteMetadata.map(rmd => rmd.id)),
			switchMap(ids => this.remoteStorage.bookmarks.downloadMany(ids).pipe(
				switchMap(remoteData => from(this.localStorage.bookmarks.putAll(remoteData)).pipe(
					map(() => remoteData)
				)),
			)),
			map(remoteData => partialDownloadSuccess({ count: remoteData.length }))

		)

	);

	uploadLocalClicked$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadLocalClicked),
			withLatestFrom(this.store.select(selBookmarkClicked)),
			map(([, clicks]) => clicks),
			switchMap(clicks => from(clicks).pipe(
				switchMap(click => this.remoteStorage.clicks.increase(click.id, click.current).pipe(
					switchMap(total => from(this.localStorage.clicks.put({ ...click, total })).pipe(
						map(() => click)
					))
				))
			)),
			toArray(),
			map(ids => ids.length),
			map(count => partialUploadSuccess({ count }))

		)

	);

	downloadRemoteClicked$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteClicks),
			switchMap(() => this.remoteStorage.clicks.downloadMany().pipe(
				switchMap(clicks => from(this.localStorage.clicks.putAll(clicks)).pipe(
					map(() => clicks.length)
				))
			)),
			map(count => partialDownloadSuccess({ count }))

		)

	);

	viewLocalUntouchedRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalUntouchedRemoteDeleted),
			withLatestFrom(this.store.select(selBookmarkRemoteDeleted)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(id => combineLatest([
				this.localStorage.bookmarks.getSyncData(id),
				this.localStorage.bookmarks.get(id)
			]).pipe(
				map(([syncData, bookmark]) => viewLocalUntouchedRemoteDeletedSuccess({ syncData, bookmark }))
			))

		)

	);

	viewLocalUntouchedRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalUntouchedRemoteUpdated),
			withLatestFrom(this.store.select(selBookmarkRemoteUpdated)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(id => combineLatest([
				this.localStorage.bookmarks.getSyncData(id),
				this.localStorage.bookmarks.get(id),
				this.localStorage.bookmarks.getRemoteMetadata(id)
			]).pipe(
				map(([syncData, bookmark, remoteMetadata]) => viewLocalUntouchedRemoteUpdatedSuccess({ syncData, bookmark, remoteMetadata }))
			))

		)

	);

	viewLocalUpdatedRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalUpdatedRemoteUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteUpdated)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(id => combineLatest([
				this.localStorage.bookmarks.getSyncData(id),
				this.localStorage.bookmarks.get(id),
				this.localStorage.bookmarks.getRemoteMetadata(id)
			]).pipe(
				map(([syncData, bookmark, remoteMetadata]) => viewLocalUpdatedRemoteUpdatedSuccess({ syncData, bookmark, remoteMetadata }))
			))

		)

	);

	viewLocalDeletedRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalDeletedRemoteDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteDeleted)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(id => combineLatest([
				this.localStorage.bookmarks.getSyncData(id),
				this.localStorage.bookmarks.get(id)
			]).pipe(
				map(([syncData, bookmark]) => viewLocalDeletedRemoteDeletedSuccess({ syncData, bookmark }))
			))

		)

	);

	viewLocalUpdatedRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalUpdatedRemoteDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteDeleted)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(id => combineLatest([
				this.localStorage.bookmarks.getSyncData(id),
				this.localStorage.bookmarks.get(id)
			]).pipe(
				map(([syncData, bookmark]) => viewLocalUpdatedRemoteDeletedSuccess({ syncData, bookmark }))
			))

		)

	);

	viewLocalDeletedRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(viewLocalDeletedRemoteUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteUpdated)),
			map(([, syncData]) => syncData[0].id), // take first
			switchMap(id => combineLatest([
				this.localStorage.bookmarks.getSyncData(id),
				this.localStorage.bookmarks.get(id),
				this.localStorage.bookmarks.getRemoteMetadata(id)
			]).pipe(
				map(([syncData, bookmark, remoteMetadata]) => viewLocalDeletedRemoteUpdatedSuccess({ syncData, bookmark, remoteMetadata }))
			))

		)

	);

}