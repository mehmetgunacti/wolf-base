import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
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
			switchMap(([, items]) =>

				this.syncService.uploadNew(WolfEntity.bookmark, items).pipe(
					map(item => bmActions.syncLocalNewSuccess({ item }))
				)

			)

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncLocalNewSuccess),
			map(({ item }) => bmActions.loadOneSyncData({ id: item.id }))

		)

	);

	loadOneRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncLocalNewSuccess),
			map(({ item }) => bmActions.loadOneRemoteMetadata({ id: item.id }))

		)

	);

}
