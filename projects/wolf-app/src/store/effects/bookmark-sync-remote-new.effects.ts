import { Injectable, inject } from '@angular/core';
import { Bookmark, SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkRemoteNew } from 'store/selectors/cloud-bookmark.selectors';

@Injectable()
export class BookmarkSyncRemoteNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteNew),
			withLatestFrom(this.store.select(selBookmarkRemoteNew)),
			switchMap(([, entities]) =>

				this.syncService.downloadNew(WolfEntity.bookmark, entities.map(e => e.id)).pipe(
					map(remoteData => bmActions.downloadSuccess({ remoteData }))
				)

			)

		)

	);

}
