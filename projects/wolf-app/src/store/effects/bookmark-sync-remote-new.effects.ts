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
			switchMap(([, items]) =>

				this.syncService.downloadNew(WolfEntity.bookmark, items).pipe(
					map(item => bmActions.syncRemoteNewSuccess({ item }))
				)

			)

		)

	);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteNewSuccess),
			map(({ item }) => bmActions.loadOne({ id: item.id }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteNewSuccess),
			map(({ item }) => bmActions.loadOneSyncData({ id: item.id }))

		)

	);

	loadOneRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncRemoteNewSuccess),
			map(({ item }) => bmActions.loadOneRemoteMetadata({ id: item.id }))

		)

	);

}
