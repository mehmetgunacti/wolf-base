import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TranslateService } from '@ngx-translate/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { i18nSaveTranslations, i18nSetLanguage } from 'store';

@Injectable()
export class UIEffects {

	constructor(
		private actions$: Actions,
		private translate: TranslateService
	) { }

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
