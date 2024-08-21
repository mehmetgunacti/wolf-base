import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as bmActions from 'store/actions/bookmark.actions';
import { selBookmarkLocalUpdated } from 'store/selectors/bookmark-selectors/bookmark-cloud.selectors';

@Injectable()
export class BookmarkSyncLocalUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(bmActions.syncLocalUpdated),
			withLatestFrom(this.store.select(selBookmarkLocalUpdated)),
			switchMap(([, items]) =>

				this.syncService.uploadUpdated(AppEntityType.bookmark, items).pipe(

					map(item => bmActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
