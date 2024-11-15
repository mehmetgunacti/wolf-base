import { noteActions } from '@actions/note.actions';
import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { commaSplit, toggleArrayItem } from '@utils/array.util';
import { filter, map, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class NoteUIEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);

	onTagClickSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.clickTag),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([ { name }, params ]) => {

				// Destructure 'tags' from query parameters
				const { tags, ...rest } = params;

				// create new 'tags' array by adding/removing incoming (clicked) tag value
				const tagsArr: string[] = toggleArrayItem(commaSplit(tags), name);

				// Create a new set of query parameters based on toggled 'tagsArr'
				const queryParams: Params = tagsArr.length === 0 ? rest : { ...params, tags: tagsArr.join(',') };

				// Navigate to current route with updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	emptyURLTagsQueryParams$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.emptySelectedTags),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([ _, params ]) => {

				// Destructure 'tags' from query parameters
				const { tags, ...queryParams } = params;

				// updated query parameters in address bar
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	// when user enters search term into search box, update 'address bar' query params
	onSearchSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.search),
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
	onQueryParamsChangeSetSelectedTags$ = createEffect(

		() => this.router.events.pipe(

			filter((e): e is NavigationEnd => e instanceof NavigationEnd),
			filter(e => e.urlAfterRedirects.startsWith('/notes')),
			withLatestFrom(this.activatedRoute.queryParamMap),
			map(([ , paramMap ]) =>

				noteActions.setQueryParams({

					search: paramMap.get('search') ?? null,
					tags: commaSplit(paramMap.get('tags'))

				})

			)

		)

	);

}
