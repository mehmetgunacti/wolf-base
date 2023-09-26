import { Injectable, inject } from '@angular/core';
import { createEffect } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { ThemeService } from 'services/theme.service';
import { selCoreIsThemeDark } from 'store/selectors/core-configuration.selectors';

@Injectable()
export class CoreThemeEffects {

	private store: Store = inject(Store);
	private themeService: ThemeService = inject(ThemeService);

	setTheme$ = createEffect(

		() => this.store.select(selCoreIsThemeDark).pipe(

			switchMap(isDark => this.themeService.switchTheme(isDark))

		),
		{ dispatch: false }

	);

}
