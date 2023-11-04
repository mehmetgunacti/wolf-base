import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { SyncService } from '@lib';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { deleteMetadata, downloadClicks, downloadDeleted, downloadNew, downloadRemoteMetadata, downloadUpdated, uploadClicks, uploadDeleted, uploadNew, uploadUpdated } from 'store/actions/cloud-bookmark.actions';
import { deleteSuccess, downloadSuccess, uploadSuccess } from 'store/actions/cloud.actions';
import { selBookmarkClicked } from 'store/selectors/bookmark-entities.selectors';
import { selBookmarkLocalNew, selBookmarkLocalDeletedRemoteDeleted, selBookmarkLocalDeleted, selBookmarkLocalUpdated, selBookmarkRemoteNew, selBookmarkRemoteDeleted, selBookmarkRemoteUpdated } from 'store/selectors/cloud-bookmark.selectors';

@Injectable()
export class CloudBookmarkEffects {

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
			withLatestFrom(this.store.select(selBookmarkLocalNew)),
			switchMap(([, entities]) => this.syncService.uploadNew(entities.map(e => e.id))),
			map(count => uploadSuccess({ count }))

		)

	);

	uploadUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdated)),
			switchMap(([, syncData]) => this.syncService.uploadUpdated(syncData.map(sd => sd.id))),
			map(count => uploadSuccess({ count }))

		)

	);

	uploadDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalDeleted)),
			switchMap(([, syncData]) => this.syncService.uploadDeleted(syncData.map(sd => sd.id))),
			map(count => deleteSuccess({ count }))

		)

	);

	downloadNewEntities$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadNew),
			withLatestFrom(this.store.select(selBookmarkRemoteNew)),
			switchMap(([, syncData]) => this.syncService.downloadNew(syncData.map(sd => sd.id))),
			map(count => downloadSuccess({ count }))

		)

	);

	downloadUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadUpdated),
			withLatestFrom(this.store.select(selBookmarkRemoteUpdated)),
			switchMap(([, metadata]) => this.syncService.downloadUpdated(metadata.map(md => md.id))),
			map(count => downloadSuccess({ count }))

		)

	);

	downloadDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadDeleted),
			withLatestFrom(this.store.select(selBookmarkRemoteDeleted)),
			switchMap(([, syncData]) => this.syncService.downloadDeleted(syncData.map(sd => sd.id))),
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

// ************************************************************

	deleteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteMetadata),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteDeleted)),
			switchMap(([, syncData]) => this.syncService.deleteMetadata(syncData.map(sd => sd.id))),
			map(count => deleteSuccess({ count }))

		)

	);

	// viewLocalUpdatedRemoteUpdated$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(viewLocalUpdatedRemoteUpdated),
	// 		withLatestFrom(this.store.select(selBookmarkLocalUpdatedRemoteUpdated)),
	// 		map(([, syncData]) => syncData[0].id), // take first
	// 		switchMap(id => combineLatest([
	// 			this.localRepository.bookmarks.getSyncData(id),
	// 			this.localRepository.bookmarks.get(id),
	// 			this.localRepository.bookmarks.getRemoteMetadata(id)
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
	// 			this.localRepository.bookmarks.getSyncData(id),
	// 			this.localRepository.bookmarks.get(id)
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
	// 			this.localRepository.bookmarks.getSyncData(id),
	// 			this.localRepository.bookmarks.getTrashItem(id),
	// 			this.localRepository.bookmarks.getRemoteMetadata(id)
	// 		]).pipe(
	// 			map(([syncData, trashItem, remoteMetadata]) => viewLocalDeletedRemoteUpdatedSuccess({ syncData, trashItem, remoteMetadata }))
	// 		))

	// 	)

	// );

}
