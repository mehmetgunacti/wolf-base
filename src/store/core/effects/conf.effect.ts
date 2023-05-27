import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Configuration, LocalStorageService } from 'lib';
import { map, skip, tap } from 'rxjs/operators';
import * as fromActions from '../actions';

@Injectable()
export class ConfEffects {

	private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	listenToConfChanges$ = createEffect(

		() => this.localStorage.configuration.dump$().pipe(
			map((configuration: Configuration) => fromActions.confChanged({ configuration }))
		)

	);

	setSidebarVisibility$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.setSidebarVisible),
			tap(({ visible }) => this.localStorage.configuration.setSidebarVisible(visible))

		),
		{ dispatch: false }

	);

}
