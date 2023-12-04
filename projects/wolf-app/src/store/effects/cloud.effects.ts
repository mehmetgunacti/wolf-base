import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { cloudTaskAction, deleteSuccess, downloadRemoteDataSuccess, downloadRemoteMetadata, downloadSuccess, uploadSuccess } from 'store/actions/cloud.actions';
import { Store } from '@ngrx/store';
import { selCoreIsFirestoreConfigMissing } from 'store/selectors/core-configuration.selectors';
import { SYNC_SERVICE } from 'app/app.config';
import { CloudTaskType, Entity, SyncService } from '@lib';
import { EMPTY } from 'rxjs';

@Injectable()
export class CloudEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	downloadRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteMetadata),
			switchMap(() => this.syncService.downloadMetadata()),
			map(count => downloadRemoteDataSuccess({ count }))

		)

	);

	cloudTaskAction$ = createEffect(

		() => this.actions$.pipe(

			ofType(cloudTaskAction),
			withLatestFrom(this.store.select(selCoreIsFirestoreConfigMissing)),
			filter(([, missing]) => !missing),
			switchMap(([{ task }]) => {

				switch (task.type) {

					// case CloudTaskType.local_new:
					// 	return this.syncService.uploadNew(task);

					// case CloudTaskType.local_updated:
					// 	return this.syncService.uploadUpdated(task);

					// case CloudTaskType.local_deleted:
					// 	return this.syncService.uploadDeleted(task);

					// case CloudTaskType.remote_new:
					// 	return this.syncService.downloadNew(task);

					// case CloudTaskType.remote_updated:
					// 	return this.syncService.downloadUpdated(task);

					// case CloudTaskType.remote_deleted:
					// 	return this.syncService.downloadDeleted(task);

					// case CloudTaskType.deleted_deleted:
					// 	return this.syncService.downloadDeleted(task);

					case CloudTaskType.updated_updated:
					case CloudTaskType.updated_deleted:
					case CloudTaskType.deleted_updated:
						return EMPTY;

				}
				return EMPTY;

			}),
			// map(([{ task }]) => showNotification({ severity: 'info', summary: 'Task Action', detail: `${task.entity}: ${task.type}` }))

		),
		{ dispatch: false }

	);

	// show notification if config is missing
	firestoreConfigMissing$ = createEffect(

		() => this.actions$.pipe(

			ofType(cloudTaskAction),
			withLatestFrom(this.store.select(selCoreIsFirestoreConfigMissing)),
			filter(([, missing]) => missing),
			map(() => showNotification({ severity: 'error', summary: 'Synchronization Failed', detail: `Firestore configuration missing` }))

		)

	);

	showNoRemoteDataNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteDataSuccess),
			filter(remoteData => remoteData === null),
			map(() => showNotification({ severity: 'info', detail: 'No RemoteData found' }))

		)

	);

	// purgeLocalItem$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(purgeLocalItem),
	// 		switchMap(({ id }) => this.localRepository.bookmarks.deletePermanently(id)),
	// 		map(() => showNotification({ severity: 'success', detail: 'Local item deleted' }))

	// 	)

	// );

	// purgeRemoteItem$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(purgeRemoteItem),
	// 		switchMap(({ id }) => this.remoteRepository.bookmarks.moveToTrash(id)),
	// 		map(() => showNotification({ severity: 'success', detail: 'Remote item deleted' }))

	// 	)

	// );

	// overrideLocalItem$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(overrideLocalItem),
	// 		withLatestFrom(this.store.select(selCloudSelectedRemoteData)),
	// 		filter((remoteData): remoteData is RemoteData<Entity> => !!remoteData),
	// 		switchMap(remoteData => this.localRepository.bookmarks.put(remoteData as RemoteData<Bookmark>)),
	// 		map(() => downloadSuccess({ count: 1 }))

	// 	)

	// );

	// overrideRemoteItem$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(overrideRemoteItem),
	// 		withLatestFrom(this.store.select(selCloudSelectedItem)),
	// 		filter((entity): entity is Entity => !!entity),
	// 		switchMap(entity => this.remoteRepository.bookmarks.upload(entity as Bookmark)),
	// 		switchMap(remoteData => this.localRepository.bookmarks.put(remoteData)),
	// 		map(() => uploadSuccess({ count: 1 }))

	// 	)

	// );


	downloadSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadSuccess),
			map(({ count }) => showNotification({ severity: 'success', summary: 'Download Complete', detail: `${count} item(s) downloaded` }))

		)

	);

	uploadSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadSuccess),
			map(({ count }) => showNotification({ severity: 'success', summary: 'Upload Complete', detail: `${count} item(s) uploaded` }))

		)

	);

	deleteSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteSuccess),
			map(({ count }) => showNotification({ severity: 'success', summary: 'Delete Complete', detail: `${count} item(s) deleted` }))

		)

	);

}
