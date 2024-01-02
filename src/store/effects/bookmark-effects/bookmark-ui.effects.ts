import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { LocalRepositoryService, OVERLAY_ID, TAG_POPULAR, WOverlayService, commaSplit, toggleArrayItem } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { BookmarkEditContainerComponent } from 'modules/bookmark/containers/bookmark-edit-container/bookmark-edit-container.component';
import { from, of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkOverlayId } from 'store/selectors/bookmark-selectors/bookmark-ui.selectors';

@Injectable()
export class BookmarkUIEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private overlayService: WOverlayService = inject(WOverlayService);

	openAddBookmarkDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.openAddBookmarkDialog, bmActions.openEditBookmarkDialog),
			map(() => this.overlayService.open(
				BookmarkEditContainerComponent,
				{
					cleanupFn: () => this.store.dispatch(bmActions.closeEditBookmarkDialog())
				}
			)),
			map(id => bmActions.openAddBookmarkDialogSuccess({ id }))

		)

	);

	closeEditBookmarkDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(
				bmActions.closeEditBookmarkDialog,
				bmActions.createSuccess,
				bmActions.updateSuccess,
				bmActions.moveToTrashSuccess
			),
			withLatestFrom(this.store.select(selBookmarkOverlayId)),
			map(([, id]) => id),
			filter((id): id is OVERLAY_ID => id !== null),
			tap(id => this.overlayService.close(id)),
			map(() => bmActions.closeEditBookmarkDialogSuccess())

		)

	);

	onTagClickSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.clickTag),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([{ name }, params]) => {

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

			ofType(bmActions.emptySelectedTags),
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

	// when user enters search term into search box, update 'address bar' query params
	onSearchSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.search),
			withLatestFrom(this.activatedRoute.queryParams),
			tap(([{ term }, params]) => {

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
			filter(e => e.urlAfterRedirects.startsWith('/bookmarks')),
			withLatestFrom(this.activatedRoute.queryParamMap),
			map(([, paramMap]) =>

				bmActions.setQueryParams({

					id: paramMap.get('id') ?? null,
					search: paramMap.get('search') ?? null,
					tags: commaSplit(paramMap.get('tags'))

				})

			)

		)

	);

	togglePopularTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.togglePopular),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.toggleTag(id, TAG_POPULAR)).pipe(
					map(() => bmActions.loadOne({ id }))
				)

			)

		)

	);

	click$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.click),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.click(id)).pipe(
					map(() => bmActions.loadOneClick({ id }))
				)

			)

		)

	);

}
