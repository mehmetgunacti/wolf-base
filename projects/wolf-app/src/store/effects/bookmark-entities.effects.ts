import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Bookmark, LocalRepositoryService, TAG_NEW, TAG_POPULAR, WolfEntity, commaSplit, toggleArrayItem } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { concat, from, of, timer } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { ClipboardService } from 'services';
import * as bmActions from 'store/actions/bookmark.actions';
import * as coreActions from 'store/actions/core-entity.actions';

// note: timer value (600) has to be ~ as in lib/components/_shake.scss
const fromClipboardFailure$ = concat(

	of(bmActions.fromClipboardFailure({ shaking: true })),
	timer(600).pipe(map(() => bmActions.fromClipboardFailure({ shaking: false })))

);

@Injectable()
export class BookmarkEntitiesEffects {

	tmpCounter: number = 0;

	private actions$: Actions = inject(Actions);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private clipboardService: ClipboardService = inject(ClipboardService);

	createEntitySuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(coreActions.createEntitySuccess, coreActions.updateEntitySuccess),
			filter(({ entity }) => entity === WolfEntity.bookmarks),
			map(({ id }) => bmActions.loadOneBookmark({ id }))

		)

	);

	loadOneBookmark$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadOneBookmark),
			switchMap(({ id }) =>

				from(this.localRepository.bookmarks.getEntity(id)).pipe(
					map(bookmark => bookmark ? bmActions.loadOneBookmarkSuccess({ bookmark }) : bmActions.loadOneBookmarkFailure({ id }))
				)

			),

		)

	);

	loadAllBookmarks$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.loadAllBookmarks),
			switchMap(() => this.localRepository.bookmarks.list()),
			map(bookmarks => bmActions.loadAllBookmarksSuccess({ bookmarks }))

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

		() => this.activatedRoute.queryParams.pipe(

			map(params => params['tags']),
			map((tags: string) => commaSplit(tags)),
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

	bookmarkTogglePopularTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.togglePopular),
			map(({ id }) => this.localRepository.bookmarks.toggleTag(id, TAG_POPULAR)),
			map(() => bmActions.loadAllBookmarks())

		)

	);

	bookmarksClick$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.clickBookmark),
			switchMap(({ id }) => this.localRepository.bookmarks.click(id)),
			map(() => bmActions.loadAllClicks())

		)

	);

	fromClipboard$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.fromClipboard),
			switchMap(() => this.clipboardService.fromClipboard()),
			switchMap((url: URL | null) => {

				if (url === null)
					return fromClipboardFailure$;
				return of(coreActions.createEntity({

					entity: WolfEntity.bookmarks,
					data: {

						urls: [url.toString()],
						title: url.hostname + '_' + this.tmpCounter,
						name: url.hostname + '_' + this.tmpCounter++,
						tags: [TAG_NEW],
						claicks: 0

					} as Partial<Bookmark>

				}));

			})

		)

	);

}
