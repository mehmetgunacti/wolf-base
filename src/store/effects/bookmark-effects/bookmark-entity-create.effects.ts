import { Injectable, inject } from '@angular/core';
import { AppEntityType, Bookmark, LocalRepositoryService, TAG_NEW } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { concat, from, of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ClipboardService } from 'services';
import * as bmActions from 'store/actions/bookmark.actions';
import * as entityActions from 'store/actions/entity.actions';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';

// note: timer value (600) has to be ~ as in lib/components/_shake.scss
const fromClipboardFailure$ = concat(

	of(bmActions.fromClipboardFailure({ shaking: true })),
	timer(600).pipe(map(() => bmActions.fromClipboardFailure({ shaking: false })))

);

@Injectable()
export class BookmarkEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);
	private clipboardService: ClipboardService = inject(ClipboardService);

	// create$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(bmActions.create),
	// 		switchMap(({ bookmark }) =>

	// 			from(
	// 				this.localRepository.bookmarks.create(bookmark)
	// 			).pipe(
	// 				map((bookmark: Bookmark) => bmActions.createSuccess({ bookmark }))
	// 			)

	// 		)

	// 	)

	// );

	// createSuccessToNotification$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(bmActions.createSuccess),
	// 		map(() => showNotification({ severity: 'success', detail: 'Bookmark created' }))

	// 	)

	// );

	// navigate$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(bmActions.createSuccess),
	// 		map(({ bookmark }) => navigate({ url: ['/bookmarks'], queryParams: { id: bookmark.id } }))

	// 	)

	// );

	// createSuccessToLoadOneBookmark$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(bmActions.createSuccess),
	// 		map(({ bookmark }) => bmActions.loadOne({ id: bookmark.id }))

	// 	)

	// );

	fromClipboard$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.fromClipboard),
			switchMap(() => this.clipboardService.fromClipboard()),
			switchMap((url: URL | null) => {

				if (url === null)
					return fromClipboardFailure$;
				const bookmark: Partial<Bookmark> = {

					urls: [url.toString()],
					title: url.hostname,
					name: url.hostname,
					tags: [TAG_NEW]

				};
				return of(entityActions.create({ entityType: AppEntityType.bookmark, entity: bookmark }));

			})

		)

	);

}
