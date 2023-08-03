import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { Bookmark, LocalStorageService, RemoteData, RemoteStorageService } from 'lib';
import { EMPTY } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { SyncService } from 'services/sync.service';
import { showNotification } from 'store/actions/core-notification.actions';
import { saveFirestoreConfigSuccess, saveTitleLookupSuccess } from 'store/actions/core.actions';
import { downloadRemoteDataSuccess, loadFirstConflict, loadFirstConflictSuccess, loadItemSuccess, loadTrashItemSuccess, overrideLocalItem, overrideRemoteItem, purgeLocalItem, purgeRemoteItem, syncTrigger } from 'store/actions/sync.actions';

@Injectable()
export class SyncEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SyncService);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	loadFirstConflict$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadFirstConflict),
			switchMap(() => this.localStorage.bookmarks.listSyncData()),
			map(list => list.filter(syncData => syncData.error)),
			map(list => list[0]),
			map(syncData => syncData ? loadFirstConflictSuccess({ syncData }) : showNotification({ severity: 'info', detail: 'No conflict found' }))

		)

	);

	loadItem$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadFirstConflictSuccess),
			map(({ syncData }) => syncData.id),
			switchMap(id => this.localStorage.bookmarks.get(id)),
			map(item => item ? loadItemSuccess({ item }) : showNotification({ severity: 'info', detail: 'No Item found' }))

		)

	);

	loadTrashItem$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadFirstConflictSuccess),
			map(({ syncData }) => syncData.id),
			switchMap(id => this.localStorage.bookmarks.getTrashItem(id)),
			map(item => loadTrashItemSuccess({ item }))

		)

	);

	downloadRemoteData$ = createEffect(

		() => this.actions$.pipe(

			ofType(loadFirstConflictSuccess),
			map(({ syncData }) => syncData.id),
			switchMap(id => this.remoteStorage.bookmarks.downloadOne(id)),
			map(remoteData => remoteData ? downloadRemoteDataSuccess({ remoteData }) : showNotification({ severity: 'info', detail: 'No RemoteData found' }))

		)

	);

	syncTrigger$ = createEffect(

		() => this.actions$.pipe(

			ofType(syncTrigger),
			tap(() => this.syncService.trigger())

		),
		{ dispatch: false }

	);

	saveFirestoreConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveFirestoreConfigSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Configuration saved' }))

		)

	);

	saveTitleLookupConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveTitleLookupSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Configuration saved' }))

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

}
