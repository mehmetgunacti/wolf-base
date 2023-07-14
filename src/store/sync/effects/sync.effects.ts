import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { SyncService } from 'services/sync.service';
import * as fromCore from 'store/core';
import * as fromSync from '../actions';

@Injectable()
export class SyncEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SyncService);

	syncBookmarksCreated$ = createEffect(

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

}
