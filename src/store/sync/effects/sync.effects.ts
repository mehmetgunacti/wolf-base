import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService } from 'lib';
import { map, tap } from 'rxjs/operators';
import { SyncService } from 'services/sync.service';
import { CoreActions, SyncActions } from 'store/actions';

@Injectable()
export class SyncEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SyncService);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	syncTrigger = createEffect(

		() => this.actions$.pipe(

			ofType(SyncActions.syncTrigger),
			tap(() => this.syncService.trigger())

		),
		{ dispatch: false }

	);

	saveFirestoreConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(CoreActions.saveFirestoreConfig),
			map(() => CoreActions.Notification.showNotification({ severity: 'success', detail: 'Configuration saved' }))

		)

	);

}
