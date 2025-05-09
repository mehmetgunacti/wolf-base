import { bookmarkActions } from '@actions/bookmark.actions';
import { entityActions } from '@actions/entity.actions';
import { Dialog } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { TAG_POPULAR } from '@constants/bookmark.constant';
import { AppEntityType } from '@constants/entity.constant';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { commaSplit, toggleArrayItem } from '@utils/array.util';
import { from } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class BookmarkUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private dialogService: Dialog = inject(Dialog);

	onTagClickSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(bookmarkActions.clickTag),
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

	setSelectedTags$ = createEffect(

		() => this.actions$.pipe(

			ofType(bookmarkActions.setSelectedTags),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([ { tags: selectedTags }, params ]) => {

				// Destructure 'tags' from query parameters
				const { tags, ...rest } = params;

				// Create a new set of query parameters based on toggled 'tagsArr'
				const queryParams: Params = { ...rest, tags: selectedTags.join(',') };

				// Navigate to current route with updated query parameters
				this.router.navigate([], { queryParams });

			})

		),
		{ dispatch: false }

	);

	emptyURLTagsQueryParams$ = createEffect(

		() => this.actions$.pipe(

			ofType(bookmarkActions.emptySelectedTags),
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

			ofType(bookmarkActions.search),
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

	// whenever address bar query params change emit setQueryParams action
	onQueryParamsChangeSetSelectedTags$ = createEffect(

		() => this.router.events.pipe(

			filter((e): e is NavigationEnd => e instanceof NavigationEnd),
			filter(e => e.urlAfterRedirects.startsWith('/bookmarks')),
			withLatestFrom(this.activatedRoute.queryParamMap),
			map(([ , paramMap ]) =>

				bookmarkActions.setQueryParams({

					id: paramMap.get('id') ?? null,
					search: paramMap.get('search') ?? null,
					tags: commaSplit(paramMap.get('tags'))

				})

			)

		)

	);

	togglePopularTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(bookmarkActions.togglePopularTag),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.toggleTag(id, TAG_POPULAR)).pipe(
					map(() => entityActions.loadOne({ entityType: AppEntityType.bookmark, id }))
				)

			)

		)

	);

	click$ = createEffect(

		() => this.actions$.pipe(

			ofType(bookmarkActions.click),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.click(id)).pipe(
					map(() => bookmarkActions.loadOneClick({ id }))
				)

			)

		)

	);

}
