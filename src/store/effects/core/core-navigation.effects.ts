import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { coreActions } from '@actions';

@Injectable()
export class CoreNavigationEffects {

	constructor(
		private actions$: Actions,
		private router: Router
	) { }

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.navigate),
			tap(({ url, queryParams, skipLocationChange }) => this.router.navigate(url, { skipLocationChange, queryParams }))

		),
		{ dispatch: false }

	);

}
