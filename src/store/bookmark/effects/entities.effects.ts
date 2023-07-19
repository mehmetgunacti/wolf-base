import { Injectable, inject } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { LOCAL_STORAGE_SERVICE, REMOTE_STORAGE_SERVICE } from 'app/app.config';
import { liveQuery } from 'dexie';
import { Bookmark, Click, LocalStorageService, POPULAR, RemoteStorageService, UUID, commaSplit, toggleArrayItem } from 'lib';
import { Observable, combineLatest, fromEventPattern, of } from 'rxjs';
import { filter, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { BookmarkActions, CoreActions } from 'store/actions';

const combineBookmarksAndClicks = (localStorage: LocalStorageService): Observable<Bookmark[]> => {

	const bookmarksList$ = fromEventPattern<Bookmark[]>(

		// this function (first parameter) is called when the fromEventPattern() observable is subscribed to.
		// note: the observable returned by Dexie's liveQuery() is not an rxjs Observable
		// hence we use fromEventPattern to convert the Dexie Observable to an rxjs Observable.
		(handler) => liveQuery(() => localStorage.bookmarks.list()).subscribe(handler),

		// this function (second parameter) is called when the fromEventPattern() observable is unsubscribed from
		(handler, unsubscribe) => unsubscribe()

	);

	const clicksList$ = fromEventPattern<Click[]>(

		(handler) => liveQuery(() => localStorage.clicks.list()).subscribe(handler),
		(handler, unsubscribe) => unsubscribe()

	)

	return combineLatest([bookmarksList$, clicksList$]).pipe(

		map(([bookmarks, clicks]) => {

			const mapClicks = new Map();
			clicks.forEach(c => mapClicks.set(c.id, c.total));
			bookmarks.forEach(b => b.clicks = mapClicks.get(b.id));
			return bookmarks;

		})

	);

};

@Injectable()
export class EntitiesEffects {

	private actions$: Actions = inject(Actions);
	private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
	private router: Router = inject(Router);
	private localStorage: LocalStorageService = inject(LOCAL_STORAGE_SERVICE);
	private remoteStorage: RemoteStorageService = inject(REMOTE_STORAGE_SERVICE);

	listFromIndexedDb$ = createEffect(

		() => combineBookmarksAndClicks(this.localStorage).pipe(

			map((bookmarks: Bookmark[]) => BookmarkActions.loadAllBookmarksSuccess({ bookmarks }))

		)

	);

	loadClicks$ = createEffect(

		() => fromEventPattern<Click[]>(

			(handler) => liveQuery(() => this.localStorage.clicks.list()).subscribe(handler),
			(handler, unsubscribe) => unsubscribe()

		).pipe(
			map(clicks => BookmarkActions.clicksSuccess({ clicks }))
		)

	);

	onTagClickSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.Tags.clickTag),
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

			ofType(BookmarkActions.Tags.emptySelectedTags),
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
			switchMap(tags => of(BookmarkActions.Tags.setSelectedTags({ tags })))

		)

	);

	onSearchSetURLQueryParam$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.Tags.search),
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
			switchMap(term => of(BookmarkActions.Tags.search({ term })))

		)

	);

	bookmarksCreate$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.createBookmark),
			map(param => param.bookmark),
			switchMap(bookmark => this.localStorage.bookmarks.create(bookmark)),
			map((bookmark: Bookmark) => BookmarkActions.createBookmarkSuccess({ bookmark }))

		)

	);

	bookmarksShowCreateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.createBookmarkSuccess),
			map(() => CoreActions.Notification.showNotification({ severity: 'success', detail: 'Bookmark created' }))

		)

	);

	bookmarksUpdate$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.updateBookmark),
			switchMap(({ id, bookmark }) => this.handleBookmarkUpdate(id, bookmark))

		)

	);

	handleBookmarkUpdate = async (id: UUID, bookmark: Partial<Bookmark>): Promise<Action> => {

		const count = await this.localStorage.bookmarks.update(id, bookmark);
		if (count === 1) {

			const bookmark = await this.localStorage.bookmarks.get(id);
			if (bookmark)
				return BookmarkActions.updateBookmarkSuccess({ bookmark });

			return BookmarkActions.updateBookmarkFailure({ id });

		}
		return BookmarkActions.updateBookmarkFailure({ id });

	}

	bookmarksShowUpdateNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.updateBookmarkSuccess),
			map(() => CoreActions.Notification.showNotification({ severity: 'success', detail: 'Bookmark updated' }))

		)

	);

	bookmarkTogglePopularTag$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.UI.togglePopular),
			tap(({ id }) => this.localStorage.bookmarks.toggleTag(id, POPULAR))

		),
		{ dispatch: false }

	);

	bookmarksDelete$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.deleteBookmark),
			map(p => p.id),
			tap(id => this.localStorage.bookmarks.moveToTrash(id)),
			// tap(() => this.toastService.show({ type: W359ToastType.SUCCESS, message: `Bookmark deleted` })),
			// map(() => BookmarkActions.bookmarksActionLoadAll())

		),
		{ dispatch: false }

	);

	bookmarksClick$ = createEffect(

		() => this.actions$.pipe(

			ofType(BookmarkActions.clickBookmark),
			tap(({ id }) => this.localStorage.clicks.click(id)),
			tap(({ id }) => this.remoteStorage.clicks.increase(id, 1))

		),
		{ dispatch: false }

	);

	// tagsToggleSelected$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(BookmarkActions.tagsToggleSelected),
	// 		map(p => p.id),
	// 		switchMap(ids => this.localStorage.bookmarks.searchByTags(ids)),
	// 		map(bookmarks => BookmarkActions.bookmarksSearchSuccess({ bookmarks }))

	// 	)

	// );

}
