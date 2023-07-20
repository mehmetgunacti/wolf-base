import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService } from 'lib';
import { map, tap } from 'rxjs/operators';
import { SyncService } from 'services/sync.service';
import { showNotification } from 'store/actions/core-notification.actions';
import { saveFirestoreConfig, saveFirestoreConfigSuccess, saveTitleLookup, saveTitleLookupSuccess } from 'store/actions/core.actions';
import { syncTrigger } from 'store/actions/sync.actions';

@Injectable()
export class SyncEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SyncService);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	syncTrigger = createEffect(

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

}
