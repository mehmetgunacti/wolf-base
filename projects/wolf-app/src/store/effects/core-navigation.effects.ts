import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { from } from 'rxjs';
import { filter, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { navigate, navigateSuccess } from 'store/actions/core-navigation.actions';
import { selCoreIsBigScreen } from 'store/selectors/core-ui.selectors';

@Injectable()
export class CoreNavigationEffects {

	constructor(
		private actions$: Actions,
		private router: Router,
		private store: Store
	) { }

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(navigate),
			withLatestFrom(this.store.select(selCoreIsBigScreen)),
			switchMap(([{ url, closeOnNavSuccess }, bigScreen]) => from(this.router.navigateByUrl(url, { skipLocationChange: false })).pipe(

				filter(success => success && !bigScreen && !!closeOnNavSuccess),
				map(() => navigateSuccess())

			))

		)

	);

}
