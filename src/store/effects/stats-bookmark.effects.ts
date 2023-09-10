import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { Bookmark, LocalStorageService, LogCategory, RemoteData, RemoteMetadata, RemoteStorageService, UUID } from 'lib';
import { Observable, combineLatest, from } from 'rxjs';
import { concatMap, filter, map, mergeMap, switchMap, toArray, withLatestFrom } from 'rxjs/operators';
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
			withLatestFrom(this.store.select(selBookmarkLocalCreatedIds)),
			switchMap(([, ids]) => this.uploadEntity$(ids, LogCategory.upload_new))

		)

	);

	uploadUpdatedEntities$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteUntouched)),
			map(([, syncData]) => syncData.map(sd => sd.id)),
			switchMap((ids: UUID[]) => this.uploadEntity$(ids, LogCategory.upload_updated))

		)

	);

	private uploadEntity$ = (ids: UUID[], category: LogCategory): Observable<any> => from(ids).pipe(

		// for each incoming id
		mergeMap(id =>

			// read entity from local storage
			from(this.localStorage.bookmarks.get(id)).pipe(

				// check if entity exists
				filter((bookmark): bookmark is Bookmark => bookmark !== null),

				// upload entity
				switchMap(entity => this.remoteStorage.bookmarks.upload(entity).pipe(

					// store all returned RemoteData
					switchMap(remoteData => this.localStorage.bookmarks.put(remoteData, category))

				)),

				// map to id
				map(() => id)

			)

		),
		toArray(),
		map(ids => uploadSuccess({ count: ids.length }))

	);

	downloadNewEntities$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadNew),
			withLatestFrom(this.store.select(selBookmarkRemoteCreated)),
			map(([, rmd]) => rmd.map(rmd => rmd.id)),

			// download remote entities
			switchMap((ids: UUID[]) => this.remoteStorage.bookmarks.downloadMany(ids).pipe(

				// store all returned RemoteData
				switchMap((remoteData: RemoteData<Bookmark>[]) => from(this.localStorage.bookmarks.putAll(remoteData, LogCategory.download_new)).pipe(map(() => remoteData.length))),

			)),

			// return
			map(count => downloadSuccess({ count }))

		)

	);


	uploadDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteUntouched)),
			switchMap(([, syncData]) => from(syncData).pipe(

				// for each incoming id
				mergeMap(({ id }) =>

					// move from collection to trash
					this.remoteStorage.bookmarks.moveToTrash(id).pipe(

						// success?
						filter((id): id is UUID => id !== null),

						// delete local metadata
						switchMap(id => from(this.localStorage.bookmarks.deletePermanently(id, LogCategory.upload_deleted)).pipe(map(() => id)))

					)

				)

			)),
			toArray(),
			map(ids => deleteSuccess({ count: ids.length }))

		)

	);

	downloadUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadUpdated),
			withLatestFrom(this.store.select(selBookmarkRemoteUpdated)),
			switchMap(([, metadata]) => from(metadata).pipe(

				// for each incoming id
				mergeMap(({ id }) =>

					// download remote entity
					this.remoteStorage.bookmarks.downloadOne(id).pipe(

						// success?
						filter((remoteData): remoteData is RemoteData<Bookmark> => remoteData !== null),

						// store entity
						switchMap(remoteData => from(this.localStorage.bookmarks.put(remoteData, LogCategory.download_updated)).pipe(map(() => remoteData.entity.id)))

					)

				),

			)),
			toArray(),
			map(ids => downloadSuccess({ count: ids.length }))

		)

	);

	downloadDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadDeleted),
			withLatestFrom(this.store.select(selBookmarkRemoteDeleted)),
			switchMap(([, syncData]) => from(syncData).pipe(

				// move local entity to trash, delete metadata
				mergeMap(syncData => from(this.localStorage.bookmarks.deletePermanently(syncData.id, LogCategory.download_deleted)).pipe(map(() => syncData.id))),

			)),
			toArray(),
			map(ids => deleteSuccess({ count: ids.length }))

		)

	);

	uploadClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadClicks),
			withLatestFrom(this.store.select(selBookmarkClicked)),
			switchMap(([, clicks]) => from(clicks).pipe(

				// upload click number
				mergeMap(click => this.remoteStorage.clicks.increase(click.id, click.current))

			)),
			map(() => downloadClicks())

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
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteDeleted)),
			switchMap(([, syncData]) => from(syncData).pipe(

				// move local entity to trash, delete metadata
				mergeMap(syncData => from(this.localStorage.bookmarks.deletePermanently(syncData.id, LogCategory.download_deleted)).pipe(map(() => syncData.id))),

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