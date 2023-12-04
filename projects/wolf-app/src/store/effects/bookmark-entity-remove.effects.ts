import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class BookmarkEntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.moveToTrash),
			switchMap(({ id }) =>

				from(
					this.localRepository.bookmarks.moveToTrash(id)
				).pipe(
					map(() => bmActions.moveToTrashSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.moveToTrashSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Bookmark moved to trash' }))

		)

	);

	loadOneBookmarkSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.moveToTrashSuccess),
			map(({ id }) => bmActions.loadOneSyncData({ id }))

		)

	);

}
