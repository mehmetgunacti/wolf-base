import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { Breakpoint } from 'lib';
import { map, switchMap } from 'rxjs/operators';
import { i18nSaveTranslations, i18nSetLanguage } from 'store';
import * as fromActions from 'store/actions';

@Injectable()
export class UIEffects {

	private actions$: Actions = inject(Actions);
	private translate: TranslateService = inject(TranslateService);
	private breakpointObserver: BreakpointObserver = inject(BreakpointObserver);
	// private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);

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

	setLang$ = createEffect(

		() => this.actions$.pipe(

			ofType(i18nSetLanguage),
			switchMap(({ newLang }) =>

				this.translate.use(newLang).pipe(

					map(translations => i18nSaveTranslations({ translations }))

				)

			)

		)

	);

}
