import { coreActions } from '@actions/core.actions';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';

@Injectable()
export class CoreNavigationEffects {

	private actions$ = inject(Actions);
	private router = inject(Router);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.navigate),
			tap(({ url, queryParams, skipLocationChange }) => this.router.navigate(url, { skipLocationChange, queryParams }))

		),
		{ dispatch: false }

	);

}
