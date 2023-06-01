import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Configuration, LocalStorageService } from 'lib';
import { map, tap } from 'rxjs/operators';
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

	setTheme$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.switchTheme),
			tap(() => this.localStorage.configuration.toggleTheme())

		),
		{ dispatch: false }

	);

	setSidebarVisibility$ = createEffect(

		() => this.actions$.pipe(

			ofType(fromActions.setSidebarVisible),
			tap(({ visible }) => this.localStorage.configuration.setSidebarVisible(visible))

		),
		{ dispatch: false }

	);

}
