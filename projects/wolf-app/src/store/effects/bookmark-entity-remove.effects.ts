import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class BookmarkEntityRemoveEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	remove$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.remove),
			switchMap(({ id }) =>

				from(
					this.localRepository.bookmarks.remove(id)
				).pipe(
					map(() => bmActions.removeSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.removeSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Bookmark removed' }))

		)

	);

	loadOneBookmarkSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.removeSuccess),
			map(({ id }) => bmActions.loadOneSyncData({ id }))

		)

	);

}
