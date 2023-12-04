import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkRemoteDeleted } from 'store/selectors/cloud-bookmark.selectors';

@Injectable()
export class BookmarkSyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteDeleted),
			withLatestFrom(this.store.select(selBookmarkRemoteDeleted)),
			switchMap(([, entities]) =>

				this.syncService.downloadDeleted(WolfEntity.bookmark, entities.map(e => e.id)).pipe(
					map(id => bmActions.downloadDeletedSuccess({ id }))
				)

			)

		)

	);

}
