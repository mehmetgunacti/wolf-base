import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkLocalDeleted } from 'store/selectors/cloud-bookmark.selectors';

@Injectable()
export class BookmarkSyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncLocalDeleted),
			withLatestFrom(this.store.select(selBookmarkLocalDeleted)),
			switchMap(([, entities]) =>

				this.syncService.uploadDeleted(WolfEntity.bookmark, entities).pipe(

					map(item => bmActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
