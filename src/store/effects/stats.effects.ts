import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { downloadRemoteDataSuccess } from 'store/actions/stats-bookmark.actions';
import { deleteSuccess, downloadSuccess, uploadSuccess } from 'store/actions/stats.actions';

@Injectable()
export class StatsEffects {

	private actions$: Actions = inject(Actions);
	// private store: Store = inject(Store);
	// private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	// private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	// downloadRemoteData$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(downloadRemoteData),
	// 		switchMap(({ id }) => this.remoteStorage.bookmarks.download(id)),
	// 		map(remoteData => remoteData ? downloadRemoteDataSuccess({ remoteData }) : downloadRemoteDataFailure())

	// 	)

	// );

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
	// 		switchMap(({ id }) => this.localStorage.bookmarks.deletePermanently(id)),
	// 		map(() => showNotification({ severity: 'success', detail: 'Local item deleted' }))

	// 	)

	// );

	// purgeRemoteItem$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(purgeRemoteItem),
	// 		switchMap(({ id }) => this.remoteStorage.bookmarks.moveToTrash(id)),
	// 		map(() => showNotification({ severity: 'success', detail: 'Remote item deleted' }))

	// 	)

	// );

	// overrideLocalItem$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(overrideLocalItem),
	// 		withLatestFrom(this.store.select(selStatsSelectedRemoteData)),
	// 		filter((remoteData): remoteData is RemoteData<Entity> => !!remoteData),
	// 		switchMap(remoteData => this.localStorage.bookmarks.put(remoteData as RemoteData<Bookmark>)),
	// 		map(() => downloadSuccess({ count: 1 }))

	// 	)

	// );

	// overrideRemoteItem$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(overrideRemoteItem),
	// 		withLatestFrom(this.store.select(selStatsSelectedItem)),
	// 		filter((entity): entity is Entity => !!entity),
	// 		switchMap(entity => this.remoteStorage.bookmarks.upload(entity as Bookmark)),
	// 		switchMap(remoteData => this.localStorage.bookmarks.put(remoteData)),
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