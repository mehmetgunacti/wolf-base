import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { CoreActions } from 'store/actions';

@Injectable()
export class CoreNavigationEffects {

	constructor(
		private actions$: Actions,
		private router: Router
	) { }

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(CoreActions.Navigation.navigate),
			tap(({ url, skipLocationChange }) => this.router.navigateByUrl(url, { skipLocationChange }))

		),
		{ dispatch: false }

	);

}
