import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LocalRepositoryService, TAG_POPULAR, commaSplit, toggleArrayItem } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from, of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as noteActions from 'store/actions/note.actions';

@Injectable()
export class NoteContentUIEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);

	onTagClickSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.clickTag),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([{ name }, params]) => {

				// Toggle the clicked tag in the 'tags' query parameter array
				const tagsArr: string[] = toggleArrayItem(commaSplit(params['tags']), name);

				// Destructure 'tags' from the query parameters, keeping the rest of the parameters in 'rest'
				const { tags, ...rest } = params;

				// Create a new set of query parameters based on the toggled 'tagsArr'
				const queryParams: Params = tagsArr.length === 0 ? rest : { ...params, tags: tagsArr.join(',') };

				// Navigate to the current route with the updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	emptyURLTagsQueryParams$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.emptySelectedTags),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([_, params]) => {

				// Destructure 'tags' from the query parameters, keeping the rest of the parameters in 'rest'
				const { tags, ...queryParams } = params;

				// Navigate to the current route with the updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	onQueryParamsChangeSetSelectedTags$ = createEffect(

		() => this.activatedRoute.queryParamMap.pipe(

			filter(() => this.router.routerState.snapshot.url.startsWith('/notes')),
			map(paramMap => commaSplit(paramMap.get('tags'))),
			map(tags => noteActions.setSelectedTags({ tags }))

		)

	);

	onSearchSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.search),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([{ term }, params]) => {

				// Destructure 'tags' from the query parameters, keeping the rest of the parameters in 'rest'
				const { search, ...rest } = params;

				// Create a new set of query parameters based on the toggled 'tagsArr'
				const queryParams: Params = term ? { ...params, search: term } : rest;

				// Navigate to the current route with the updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	onQueryParamsChangeSetSearch$ = createEffect(

		() => this.activatedRoute.queryParams.pipe(

			map(params => params['search']),
			filter(term => !!term),
			switchMap(term => of(noteActions.search({ term })))

		)

	);

	togglePopularTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.togglePopular),
			switchMap(({ id }) =>

				from(this.localRepository.notes.toggleTag(id, TAG_POPULAR)).pipe(
					map(() => noteActions.loadOne({ id }))
				)

			)

		)

	);

}
