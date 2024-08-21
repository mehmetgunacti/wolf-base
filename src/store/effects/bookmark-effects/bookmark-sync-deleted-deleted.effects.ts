import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkLocalDeletedRemoteDeleted } from 'store/selectors/bookmark-selectors/bookmark-cloud.selectors';

@Injectable()
export class BookmarkSyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncDeletedDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalDeletedRemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(AppEntityType.bookmark, items).pipe(

					map(item => bmActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
