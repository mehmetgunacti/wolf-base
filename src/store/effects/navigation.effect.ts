import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { navigate } from 'store/actions/navigation.action';

@Injectable()
export class NavigationEffects {

	constructor(
		private actions$: Actions,
		private router: Router
	) { }

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(navigate),
			tap(({ url, skipLocationChange }) => this.router.navigateByUrl(url, { skipLocationChange }))

		),
		{ dispatch: false }

	);

}
