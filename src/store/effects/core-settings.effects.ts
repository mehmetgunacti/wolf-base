import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { LocalStorageService } from 'lib';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import { saveFirestoreConfig, saveFirestoreConfigSuccess, saveTitleLookup, saveTitleLookupSuccess } from 'store/actions/settings.actions';

@Injectable()
export class CoreSettingsEffects {

    private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	saveFirestoreConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveFirestoreConfig),
			switchMap(({ config }) => this.localStorage.configuration.setFirestoreConfig(config)),
			map(() => saveFirestoreConfigSuccess())

		)

	);

    saveFirestoreConfigSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveFirestoreConfigSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Configuration saved' }))

		)

	);

	saveTitleLookupConfig$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveTitleLookup),
			switchMap(({ url }) => this.localStorage.configuration.setTitleLookupUrl(url)),
			map(() => saveFirestoreConfigSuccess())

		)

	);

	saveTitleLookupSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(saveTitleLookupSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Configuration saved' }))

		)

	);

}
