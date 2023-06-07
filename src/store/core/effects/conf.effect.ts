import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { Configuration, LocalStorageService } from 'lib';
import { fromEventPattern } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import * as fromActions from '../actions';

@Injectable()
export class ConfEffects {

	private actions$: Actions = inject(Actions);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	listenToConfChanges$ = createEffect(

		() => fromEventPattern<Configuration>(

			// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
			// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
			// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
			(handler) => liveQuery(() => this.localStorage.configuration.dump()).subscribe(handler),

			// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
			(handler, unsubscribe) => unsubscribe()

		).pipe(
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
