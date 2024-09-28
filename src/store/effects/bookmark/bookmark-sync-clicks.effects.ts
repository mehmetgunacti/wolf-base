import { Injectable, inject } from '@angular/core';
import { BookmarkSyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BOOKMARK_SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { bookmarkActions, entityActions } from 'store/actions';
import { selBookmark_clicked } from 'store/selectors/bookmark/bookmark-clicks.selectors';

@Injectable()
export class BookmarkSyncClicksEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: BookmarkSyncService = inject(BOOKMARK_SYNC_SERVICE);

	uploadClicked$ = createEffect(

		() => this.actions$.pipe(

			ofType(bookmarkActions.uploadClicked),
			withLatestFrom(this.store.select(selBookmark_clicked)),
			switchMap(([, clicks]) =>

				this.syncService.uploadClicks(clicks).pipe(
					map(click => bookmarkActions.loadOneClickSuccess({ id: click.id, click }))
				)

			)

		)

	);

	downloadClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.downloadRemoteMetadata),
			switchMap(() =>

				this.syncService.downloadClicks().pipe(
					map(() => bookmarkActions.loadAllClicks())
				)

			)

		)

	);

}
