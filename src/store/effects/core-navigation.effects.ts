import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class CoreNavigationEffects {

	constructor(
		private actions$: Actions,
		private router: Router,
		private activatedRoute: ActivatedRoute
	) { }

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(navigate),
			tap(({ url, skipLocationChange }) => this.router.navigateByUrl(url, { skipLocationChange }))

		),
		{ dispatch: false }

	);

	// event$ = createEffect(

	// 	() => this.router.events.pipe(
	// 		tap(a => console.log('events$', a))
	// 	),
	// 	{ dispatch: false }

	// );

	data$ = createEffect(

		() => this.activatedRoute.data.pipe(
			tap(a => console.log('data$', a))
		),
		{ dispatch: false }

	);

	paramMap$ = createEffect(

		() => this.activatedRoute.paramMap.pipe(
			tap(a => console.log('paramMap$', a)),
			map(a => showNotification({severity: 'info', detail: `${a.get('id')}`}))
		)

	);

	params$ = createEffect(

		() => this.activatedRoute.params.pipe(
			tap(a => console.log('params$', a))
		),
		{ dispatch: false }

	);

	queryParamMap$ = createEffect(

		() => this.activatedRoute.queryParamMap.pipe(
			tap(a => console.log('queryParamMap$', a))
		),
		{ dispatch: false }

	);

	queryParams$ = createEffect(

		() => this.activatedRoute.queryParams.pipe(
			tap(a => console.log('queryParams$' ,a))
		),
		{ dispatch: false }

	);


	title$ = createEffect(

		() => this.activatedRoute.title.pipe(
			tap(a => console.log('title$', a))
		),
		{ dispatch: false }

	);

}
