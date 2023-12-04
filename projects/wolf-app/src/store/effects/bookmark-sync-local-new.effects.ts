import { Injectable, inject } from '@angular/core';
import { Bookmark, SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkLocalNew } from 'store/selectors/cloud-bookmark.selectors';

@Injectable()
export class BookmarkSyncLocalNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncLocalNew),
			withLatestFrom(this.store.select(selBookmarkLocalNew)),
			switchMap(([, entities]) =>

				this.syncService.uploadNew(WolfEntity.bookmark, entities).pipe(
					map(remoteMetadata => bmActions.uploadSuccess({ remoteMetadata }))
				)

			)

		)

	);

}
