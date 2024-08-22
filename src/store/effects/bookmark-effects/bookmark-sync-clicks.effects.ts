import { Injectable, inject } from '@angular/core';
import { BookmarkSyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BOOKMARK_SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { loadAllClicks, loadOneClickSuccess, uploadClicked } from 'store/actions/bookmark.actions';
import { startSync } from 'store/actions/cloud.actions';
import { selBookmark_clicked } from 'store/selectors/bookmark-selectors/bookmark-entities.selectors';

@Injectable()
export class BookmarkSyncClicksEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: BookmarkSyncService = inject(BOOKMARK_SYNC_SERVICE);

	uploadClicked$ = createEffect(

		() => this.actions$.pipe(

			ofType(uploadClicked),
			withLatestFrom(this.store.select(selBookmark_clicked)),
			switchMap(([, clicks]) =>

				this.syncService.uploadClicks(clicks).pipe(
					map(click => loadOneClickSuccess({ id: click.id, click }))
				)

			)

		)

	);

	downloadClicks$ = createEffect(

		() => this.actions$.pipe(

			ofType(startSync),
			switchMap(() =>

				this.syncService.downloadClicks().pipe(
					map(() => loadAllClicks())
				)

			)

		)

	);

}
