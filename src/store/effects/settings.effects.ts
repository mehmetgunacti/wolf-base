import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { saveFirestoreConfigSuccess, saveTitleLookupSuccess } from 'store/actions/settings.actions';

@Injectable()
export class SettingsEffects {

	private actions$: Actions = inject(Actions);

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