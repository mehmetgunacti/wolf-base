import { projectActions } from '@actions/project.actions';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class ProjectUIEffects {

	private actions$: Actions = inject(Actions);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);

	// when user enters search term into search box, update 'address bar' query params
	onSearchSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.search),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([ { term }, params ]) => {

				// term: user just entered a search term
				// term is an empty string when user empties search box

				// Destructure current 'address bar' state (query params)
				const { search, ...rest } = params;

				// if term is an empty string -> remove 'search' from address bar (query params)
				// otherwise add new, incoming search term as 'search' to address bar (query params)
				const queryParams: Params = term ? { ...params, search: term } : rest;

				// Navigate to the current route with the updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	// whenever address bar query params change emit setQueryParams action for reducers to update state
	onQueryParamsChange$ = createEffect(

		() => this.router.events.pipe(

			filter((e): e is NavigationEnd => e instanceof NavigationEnd),
			filter(e => {

				const after = e.urlAfterRedirects;
				return after.startsWith('/projects') && !after.startsWith('/projects/');

			}),
			withLatestFrom(this.activatedRoute.queryParamMap),
			map(([ , paramMap ]) =>

				projectActions.setQueryParams({

					search: paramMap.get('search') ?? null

				})

			)

		)

	);

}
