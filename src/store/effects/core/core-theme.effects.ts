import { coreActions } from '@actions/core.actions';
import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { Store } from '@ngrx/store';
import { selCore_theme } from '@selectors/core/core-ui.selectors';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { switchMap, tap } from 'rxjs/operators';

@Injectable()
export class CoreThemeEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private document: Document = inject(DOCUMENT);

	saveThemeToLocalRepository$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.setNextTheme),
			concatLatestFrom(() => this.store.select(selCore_theme)),
			switchMap(([ , theme ]) => this.localRepository.configuration.setTheme(theme))

		),
		{ dispatch: false }

	);

	setThemeOnBodyTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				coreActions.setNextTheme,
				coreActions.loadAllSuccess
			),
			concatLatestFrom(() => this.store.select(selCore_theme)),

			// replace 'theme-' class of <body>
			tap(([ , theme ]) => {

				this.document.documentElement.dataset[ 'theme' ] = theme;

			})

		),
		{ dispatch: false }

	);

}
