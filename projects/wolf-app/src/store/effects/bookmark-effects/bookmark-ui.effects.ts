import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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

	onQueryParamsChangeSetSelectedTags$ = createEffect(

		() => this.activatedRoute.queryParamMap.pipe(

			filter(() => this.router.routerState.snapshot.url.startsWith('/bookmarks')),
			map(paramMap => commaSplit(paramMap.get('tags'))),
			map(tags => bmActions.setSelectedTags({ tags }))

		)

	);

	onSearchSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.search),
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
			switchMap(term => of(bmActions.search({ term })))

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
