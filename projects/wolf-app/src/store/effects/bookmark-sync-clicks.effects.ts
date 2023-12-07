import { Injectable, inject } from '@angular/core';
import { BookmarkSyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BOOKMARK_SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { loadOneClickSuccess, syncClicked } from 'store/actions/bookmark.actions';
import { selBookmarkClicked } from 'store/selectors/bookmark-entities.selectors';

@Injectable()
export class BookmarkSyncClicksEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: BookmarkSyncService = inject(BOOKMARK_SYNC_SERVICE);

	syncClicked$ = createEffect(

		() => this.actions$.pipe(

			ofType(syncClicked),
			withLatestFrom(this.store.select(selBookmarkClicked)),
			switchMap(([, clicks]) =>

				this.syncService.uploadClicks(clicks).pipe(
					map(click => loadOneClickSuccess({ id: click.id, click }))
				)

			)

		)

	);

}
