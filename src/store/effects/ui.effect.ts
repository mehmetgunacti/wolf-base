import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'lib';
import { map, switchMap, tap } from 'rxjs/operators';
import { i18nSaveTranslations, i18nSetLanguage } from 'store';
import * as fromActions from 'store/actions';

@Injectable()
export class UIEffects {

	constructor(
		private actions$: Actions,
		private translate: TranslateService,
		private breakpointObserver: BreakpointObserver,
		private localStorage: LocalStorageService
	) { }

	setBigScreen$ = createEffect(

		() => this.breakpointObserver
			.observe('(min-width: 767px)')
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
