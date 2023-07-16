import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { LocalStorageService, SyncData } from 'lib';
import { fromEventPattern } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { SyncService } from 'services/sync.service';
import * as fromCore from 'store/core';
import * as fromSync from '../actions';

@Injectable()
export class SyncEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SyncService);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	syncTrigger = createEffect(

		() => this.actions$.pipe(

			ofType(fromSync.syncTrigger),
			tap(() => this.syncService.trigger())

		),
		{ dispatch: false }

	);

	saveFirestoreConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromCore.saveFirestoreConfig),
			map(() => fromCore.showNotification({ severity: 'success', detail: 'Configuration saved' }))

		)

	);

	loadBookmarksSyncData$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listSyncData()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(syncData => fromSync.bookmarksSyncSuccess({ syncData }))
		)

	);

	trashCount$ = createEffect(

		() => fromEventPattern<SyncData[]>(

			(handler) => liveQuery(() => this.localStorage.bookmarks.listDeletedItems()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(items => fromSync.bookmarksTrashCountSuccess({ count: items.length }))
		)

	);

}
