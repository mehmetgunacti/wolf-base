import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkLocalUpdated } from 'store/selectors/cloud-bookmark.selectors';

@Injectable()
export class BookmarkSyncLocalUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncLocalUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdated)),
			switchMap(([, entities]) =>

				this.syncService.uploadUpdated(WolfEntity.bookmark, entities).pipe(
					map(item => bmActions.syncLocalUpdatedSuccess({ item }))
				)

			)

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncLocalUpdatedSuccess),
			map(({ item }) => bmActions.loadOneSyncData({ id: item.id }))

		)

	);

	loadOneRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncLocalUpdatedSuccess),
			map(({ item }) => bmActions.loadOneRemoteMetadata({ id: item.id }))

		)

	);

}
