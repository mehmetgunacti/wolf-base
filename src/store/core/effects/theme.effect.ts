import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { DARK_THEME, LocalStorageService, PATH_OF_THEME_DARK, PATH_OF_THEME_LIGHT, THEME } from 'lib';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { ScriptLoaderService } from 'services/script-loader.service';
import * as fromActions from '../actions';
import * as fromSelectors from '../selectors';
import { concat } from 'rxjs';

@Injectable()
export class ThemeEffects {

	private store: Store = inject(Store);
	private actions$: Actions = inject(Actions);
	private scriptLoaderService: ScriptLoaderService = inject(ScriptLoaderService);
	private localStorageService: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	setTheme$ = createEffect(

		() => this.store.select(fromSelectors.theme).pipe(

			// do nothing if current theme is dark/light and user clicked dark/light icon
			// filter(([{ newTheme }, currentTheme]) => newTheme !== currentTheme),
			switchMap(async (theme: THEME) => {

				console.log('==============' + theme + '==================');
				if (theme === 'dark')
					this.scriptLoaderService.appendLink2Head(PATH_OF_THEME_DARK).subscribe({
						complete: () => {
							console.log('dark completed');
							this.scriptLoaderService.addClassToBody(DARK_THEME);
							this.scriptLoaderService.removeLinkFromHead(PATH_OF_THEME_LIGHT);
						}
					});

				else
					this.scriptLoaderService.appendLink2Head(PATH_OF_THEME_LIGHT).subscribe({
						complete: () => {
							console.log('light completed');
							this.scriptLoaderService.removeClassFromBody(DARK_THEME);
							this.scriptLoaderService.removeLinkFromHead(PATH_OF_THEME_DARK);
						}
					});

			})

		),
		{ dispatch: false }

	);

}
