import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect } from '@ngrx/effects';
import { LOCAL_STORAGE_SERVICE } from 'app/app.config';
import { Breakpoint, LocalStorageService } from 'lib';
import { map } from 'rxjs/operators';
import * as fromActions from '../actions';

@Injectable()
export class UIEffects {

	private actions$: Actions = inject(Actions);
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

	// langConfValueFromIndexedDb$ = createEffect(

	// 	() => this.localStorage.configuration.get$(CONF_KEYS.lang).pipe(

	// 		map((lang: string) => fromActions.i18nSetLanguage({ newLang: resolveLang(lang) }))

	// 	)

	// );

	// const lsTheme = localStorage.getItem('theme');
	// const newTheme = !!lsTheme ? resolveTheme(lsTheme) : DEFAULT_THEME;
	// store.dispatch(actions.themeSet({ newTheme }));

	// // set lang
	// const lsLang = localStorage.getItem('lang');
	// const newLang = !!lsLang ? resolveLang(lsLang) : DEFAULT_LANG;
	// store.dispatch(actions.i18nSetLanguage({ newLang }));


	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe(`(min-width: ${ Breakpoint.lg })`)
			.pipe(
				map((result) => fromActions.setBigScreen({ isBigScreen: result.matches }))
			)

	);


	// sidebarVisible$ = createEffect(

	// 	() => this.localStorage.bookmarks.list$({
	// 		orderBy: 'clicks',
	// 		reverse: true,
	// 		limit: 50
	// 	}).pipe(
	// 		map((bookmarks) => fromActions.loadAllBookmarksSuccess({ bookmarks }))
	// 	)

	// );

}
