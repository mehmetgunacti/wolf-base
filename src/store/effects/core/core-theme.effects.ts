import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LocalRepositoryService } from '@libServices';
import { switchMap, tap } from 'rxjs/operators';
import { LOCAL_REPOSITORY_SERVICE } from 'services';
import { coreActions } from '@actions';
import { selCore_theme } from '@selectors';

@Injectable()
export class CoreThemeEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private document: Document = inject(DOCUMENT);

	setTheme$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.setTheme),
			switchMap(({ theme }) => this.localRepository.configuration.setTheme(theme))

		),
		{ dispatch: false }

	);

	setThemeOnBodyTag$ = createEffect(

		() => this.store.select(selCore_theme).pipe(

			// replace 'theme-' class of <body>
			tap(theme => {

				this.document.documentElement.dataset[ 'theme' ] = theme;

			})


		),
		{ dispatch: false }

	);

}
