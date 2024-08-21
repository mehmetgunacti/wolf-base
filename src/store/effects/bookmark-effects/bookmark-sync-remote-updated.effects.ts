import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkRemoteUpdated } from 'store/selectors/bookmark-selectors/bookmark-cloud.selectors';

@Injectable()
export class BookmarkSyncRemoteUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteUpdated),
			withLatestFrom(this.store.select(selBookmarkRemoteUpdated)),
			switchMap(([, items]) =>

				this.syncService.downloadUpdated(EntityType.bookmark, items).pipe(

					map(item => bmActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
