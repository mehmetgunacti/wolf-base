import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { Bookmark, LocalStorageService, LogCategory, RemoteData, RemoteMetadata, RemoteStorageService, SyncData, UUID } from 'lib';
import { Observable, combineLatest, from } from 'rxjs';
import { filter, map, switchMap, toArray, withLatestFrom } from 'rxjs/operators';
import { deletePermanently, downloadClicks, downloadDeleted, downloadNew, downloadRemoteMetadata, downloadUpdated, uploadClicks, uploadDeleted, uploadNew, uploadUpdated, viewLocalDeletedRemoteUpdated, viewLocalDeletedRemoteUpdatedSuccess, viewLocalUpdatedRemoteDeleted, viewLocalUpdatedRemoteDeletedSuccess, viewLocalUpdatedRemoteUpdated, viewLocalUpdatedRemoteUpdatedSuccess } from 'store/actions/stats-bookmark.actions';
import { deleteSuccess, downloadSuccess, uploadSuccess } from 'store/actions/stats.actions';
import { selBookmarkClicked } from 'store/selectors/bookmark-entities.selectors';
import { selBookmarkLocalCreatedIds, selBookmarkLocalDeletedRemoteDeleted, selBookmarkLocalDeletedRemoteUntouched, selBookmarkLocalDeletedRemoteUpdated, selBookmarkLocalUpdatedRemoteDeleted, selBookmarkLocalUpdatedRemoteUntouched, selBookmarkLocalUpdatedRemoteUpdated, selBookmarkRemoteCreated, selBookmarkRemoteDeleted, selBookmarkRemoteUpdated } from 'store/selectors/stats-bookmark.selectors';

@Injectable()
export class StatsBookmarkEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	downloadRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteMetadata),
			switchMap(() => this.remoteStorage.bookmarks.downloadMetadata()),
			switchMap((rmd: RemoteMetadata[]) => from(this.localStorage.bookmarks.putRemoteMetadata(rmd)).pipe(map(() => rmd.length))),
			map(count => downloadSuccess({ count }))

		)

	);

	uploadNewEntities$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadNew),
			switchMap(() => this.store.select(selBookmarkLocalCreatedIds)),
			switchMap((ids: UUID[]) => this.uploadEntity$(ids, LogCategory.upload_new))

		)

	);

	downloadNewEntities$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadNew),
			switchMap(() => this.store.select(selBookmarkRemoteCreated)),
			map((rmd: RemoteMetadata[]) => rmd.map(rmd => rmd.id)),

			// download remote entities
			switchMap((ids: UUID[]) => this.remoteStorage.bookmarks.downloadMany(ids)),

			// save all return values
			switchMap((remoteData: RemoteData<Bookmark>[]) => from(this.localStorage.bookmarks.putAll(remoteData, LogCategory.download_new)).pipe(map(() => remoteData.length))),
			map(count => downloadSuccess({ count }))

		)

	);

	uploadUpdatedEntities$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadUpdated),
			switchMap(() => this.store.select(selBookmarkLocalUpdatedRemoteUntouched)),
			map(syncData => syncData.map(sd => sd.id)),
			switchMap((ids: UUID[]) => this.uploadEntity$(ids, LogCategory.upload_updated))

		)

	);

	private uploadEntity$ = (ids: UUID[], category: LogCategory): Observable<any> => from(ids).pipe(

		// read local entity
		switchMap(id => from(this.localStorage.bookmarks.get(id)).pipe(

			// check if entity exists, skip if it doesn't
			filter((bookmark): bookmark is Bookmark => bookmark !== null),

			// upload entity
			switchMap(bookmark => this.remoteStorage.bookmarks.upload(bookmark)),

			// save return value
			switchMap(remoteData => this.localStorage.bookmarks.put(remoteData, category)),

			// map to id
			map(() => id)

		)),
		toArray(),
		map(ids => uploadSuccess({ count: ids.length }))

	);

	uploadDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadDeleted),
			switchMap(() => this.store.select(selBookmarkLocalDeletedRemoteUntouched)),
			switchMap((syncData: SyncData[]) => from(syncData).pipe(

				// move from collection to trash
				switchMap(({ id }) => this.remoteStorage.bookmarks.moveToTrash(id)),

				// success?
				filter((id): id is UUID => id !== null),

				// delete local metadata
				switchMap(id => from(this.localStorage.bookmarks.deletePermanently(id, LogCategory.upload_deleted)).pipe(map(() => id))),

			)),
			toArray(),
			map(ids => deleteSuccess({ count: ids.length }))

		)

	);

	downloadUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadUpdated),
			switchMap(() => this.store.select(selBookmarkRemoteUpdated)),
			switchMap((metadata: RemoteMetadata[]) => from(metadata).pipe(

				// download remote entity
				switchMap(({ id }) => this.remoteStorage.bookmarks.downloadOne(id)),

				// success?
				filter((remoteData): remoteData is RemoteData<Bookmark> => remoteData !== null),

				// store entity
				switchMap(remoteData => from(this.localStorage.bookmarks.put(remoteData, LogCategory.download_updated)).pipe(map(() => remoteData.entity.id)))

			)),
			toArray(),
			map(ids => downloadSuccess({ count: ids.length }))

		)

	);

	downloadDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadDeleted),
			switchMap(() => this.store.select(selBookmarkRemoteDeleted)),
			switchMap((syncData: SyncData[]) => from(syncData).pipe(

				// move local entity to trash, delete metadata
				switchMap(syncData => from(this.localStorage.bookmarks.deletePermanently(syncData.id, LogCategory.download_deleted)).pipe(map(() => syncData.id))),

			)),
			toArray(),
			map(ids => deleteSuccess({ count: ids.length }))

		)

	);

	uploadClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadClicks),
			switchMap(() => this.store.select(selBookmarkClicked)),
			switchMap(clicks => from(clicks).pipe(

				// upload click number
				switchMap(click => this.remoteStorage.clicks.increase(click.id, click.current))

			)),
			toArray(),
			map(numbers => uploadSuccess({ count: numbers.length }))

		)

	);

	downloadRemoteClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadClicks),
			switchMap(() => this.remoteStorage.clicks.downloadMany().pipe(

				// download clicks
				switchMap(clicks => from(this.localStorage.clicks.putAll(clicks)).pipe(map(() => clicks)))

			)),
			map(clicks => downloadSuccess({ count: clicks.length }))

		)

	);

	deletePermanently$ = createEffect(

		() => this.actions$.pipe(

			ofType(deletePermanently),
			switchMap(() => this.store.select(selBookmarkLocalDeletedRemoteDeleted)),
			switchMap((syncData: SyncData[]) => from(syncData).pipe(

				// move local entity to trash, delete metadata
				switchMap(syncData => from(this.localStorage.bookmarks.deletePermanently(syncData.id, LogCategory.download_deleted)).pipe(map(() => syncData.id))),

			)),
			toArray(),
			map(ids => deleteSuccess({ count: ids.length }))

		)

	);

	// ************************************************************

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
				this.localStorage.bookmarks.getTrashItem(id),
				this.localStorage.bookmarks.getRemoteMetadata(id)
			]).pipe(
				map(([syncData, trashItem, remoteMetadata]) => viewLocalDeletedRemoteUpdatedSuccess({ syncData, trashItem, remoteMetadata }))
			))

		)

	);

}