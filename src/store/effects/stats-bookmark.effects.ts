import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { Bookmark, LogCategory, RemoteData, RemoteMetadata, SyncService, UUID } from 'lib';
import { Observable, combineLatest, from } from 'rxjs';
import { filter, map, mergeMap, switchMap, toArray, withLatestFrom } from 'rxjs/operators';
import { deletePermanently, downloadClicks, downloadDeleted, downloadNew, downloadRemoteMetadata, downloadUpdated, uploadClicks, uploadDeleted, uploadNew, uploadUpdated, viewLocalDeletedRemoteUpdated, viewLocalDeletedRemoteUpdatedSuccess, viewLocalUpdatedRemoteDeleted, viewLocalUpdatedRemoteDeletedSuccess, viewLocalUpdatedRemoteUpdated, viewLocalUpdatedRemoteUpdatedSuccess } from 'store/actions/stats-bookmark.actions';
import { deleteSuccess, downloadSuccess, uploadSuccess } from 'store/actions/stats.actions';
import { selBookmarkClicked } from 'store/selectors/bookmark-entities.selectors';
import { selBookmarkLocalCreatedIds, selBookmarkLocalDeletedRemoteDeleted, selBookmarkLocalDeletedRemoteUntouched, selBookmarkLocalDeletedRemoteUpdated, selBookmarkLocalUpdatedRemoteDeleted, selBookmarkLocalUpdatedRemoteUntouched, selBookmarkLocalUpdatedRemoteUpdated, selBookmarkRemoteCreated, selBookmarkRemoteDeleted, selBookmarkRemoteUpdated } from 'store/selectors/stats-bookmark.selectors';

@Injectable()
export class StatsBookmarkEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);
	// private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	// private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	downloadRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteMetadata),
			switchMap(() => this.syncService.downloadMetadata()),
			map(count => downloadSuccess({ count }))

		)

	);

	uploadNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadNew),
			withLatestFrom(this.store.select(selBookmarkLocalCreatedIds)),
			switchMap(([, ids]) => this.syncService.uploadEntities(ids)),
			map(ids => uploadSuccess({ count: ids.length }))

		)

	);

	uploadUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteUntouched)),
			switchMap(([, syncData]) => this.syncService.uploadEntities(syncData.map(sd => sd.id))),
			map(ids => uploadSuccess({ count: ids.length }))

		)

	);

	uploadDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteUntouched)),
			switchMap(([, syncData]) => this.syncService.uploadDeleted(syncData.map(sd => sd.id))),
			map(count => deleteSuccess({ count }))

		)

	);

	downloadNewEntities$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadNew),
			withLatestFrom(this.store.select(selBookmarkRemoteCreated)),
			switchMap(([, syncData]) => this.syncService.downloadMany(syncData.map(sd => sd.id))),
			map(count => downloadSuccess({ count }))

		)

	);

	downloadUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadUpdated),
			withLatestFrom(this.store.select(selBookmarkRemoteUpdated)),
			switchMap(([, metadata]) => this.syncService.downloadMany(metadata.map(md => md.id))),
			map(count => downloadSuccess({ count }))

		)

	);


	downloadDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadDeleted),
			withLatestFrom(this.store.select(selBookmarkRemoteDeleted)),
			switchMap(([, syncData]) => this.syncService.deleteMany(syncData.map(sd => sd.id))),
			map(count => deleteSuccess({ count }))

		)

	);

	uploadClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadClicks),
			withLatestFrom(this.store.select(selBookmarkClicked)),
			switchMap(([, clicks]) => this.syncService.uploadClicks(clicks)),
			map(() => downloadClicks())

		)

	);

	downloadRemoteClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadClicks),
			switchMap(() => this.syncService.downloadClicks()),
			map(count => downloadSuccess({ count }))

		)

	);

	deletePermanently$ = createEffect(

		() => this.actions$.pipe(

			ofType(deletePermanently),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteDeleted)),
			switchMap(([, syncData]) => this.syncService.deleteMany(syncData.map(sd => sd.id))),
			map(count => deleteSuccess({ count }))

		)

	);

	// ************************************************************

	// viewLocalUpdatedRemoteUpdated$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(viewLocalUpdatedRemoteUpdated),
	// 		withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteUpdated)),
	// 		map(([, syncData]) => syncData[0].id), // take first
	// 		switchMap(id => combineLatest([
	// 			this.localStorage.bookmarks.getSyncData(id),
	// 			this.localStorage.bookmarks.get(id),
	// 			this.localStorage.bookmarks.getRemoteMetadata(id)
	// 		]).pipe(
	// 			map(([syncData, bookmark, remoteMetadata]) => viewLocalUpdatedRemoteUpdatedSuccess({ syncData, bookmark, remoteMetadata }))
	// 		))

	// 	)

	// );

	// viewLocalUpdatedRemoteDeleted$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(viewLocalUpdatedRemoteDeleted),
	// 		withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteDeleted)),
	// 		map(([, syncData]) => syncData[0].id), // take first
	// 		switchMap(id => combineLatest([
	// 			this.localStorage.bookmarks.getSyncData(id),
	// 			this.localStorage.bookmarks.get(id)
	// 		]).pipe(
	// 			map(([syncData, bookmark]) => viewLocalUpdatedRemoteDeletedSuccess({ syncData, bookmark }))
	// 		))

	// 	)

	// );

	// viewLocalDeletedRemoteUpdated$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(viewLocalDeletedRemoteUpdated),
	// 		withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteUpdated)),
	// 		map(([, syncData]) => syncData[0].id), // take first
	// 		switchMap(id => combineLatest([
	// 			this.localStorage.bookmarks.getSyncData(id),
	// 			this.localStorage.bookmarks.getTrashItem(id),
	// 			this.localStorage.bookmarks.getRemoteMetadata(id)
	// 		]).pipe(
	// 			map(([syncData, trashItem, remoteMetadata]) => viewLocalDeletedRemoteUpdatedSuccess({ syncData, trashItem, remoteMetadata }))
	// 		))

	// 	)

	// );

}