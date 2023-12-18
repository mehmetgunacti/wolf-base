import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class BookmarkEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.update),
			switchMap(({ id, bookmark }) =>

				from(
					this.localRepository.bookmarks.update(id, bookmark)
				).pipe(
					map(() => bmActions.updateSuccess({ id }))
				)

			)

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.updateSuccess),
			map(({ id }) => navigate({ url: ['/bookmarks'], queryParams: { id } }))

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Bookmark updated' }))

		)

	);

	loadOneBookmark$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.updateSuccess),
			map(({ id }) => bmActions.loadOne({ id }))

		)

	);

	loadOneBookmarkSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.updateSuccess),
			map(({ id }) => bmActions.loadOneSyncData({ id }))

		)

	);

}
