import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkRemoteUpdated } from 'store/selectors/cloud-bookmark.selectors';

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

				this.syncService.downloadUpdated(WolfEntity.bookmark, items).pipe(
					map(item => bmActions.syncRemoteUpdatedSuccess({ item }))
				)

			)

		)

	);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteUpdatedSuccess),
			map(({ item }) => bmActions.loadOne({ id: item.id }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteUpdatedSuccess),
			map(({ item }) => bmActions.loadOneSyncData({ id: item.id }))

		)

	);

	loadOneRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteUpdatedSuccess),
			map(({ item }) => bmActions.loadOneRemoteMetadata({ id: item.id }))

		)

	);

}
