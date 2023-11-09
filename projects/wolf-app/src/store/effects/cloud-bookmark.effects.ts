import { Injectable, inject } from '@angular/core';
import { BookmarkSyncService, CloudTaskType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { BOOKMARK_SYNC_SERVICE } from 'app/app.config';
import { EMPTY } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';
import { cloudTaskAction } from 'store/actions/cloud.actions';
import { selCoreIsFirestoreConfigMissing } from 'store/selectors/core-configuration.selectors';

@Injectable()
export class CloudBookmarkEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: BookmarkSyncService = inject(BOOKMARK_SYNC_SERVICE);

	cloudTaskAction$ = createEffect(

		() => this.actions$.pipe(

			ofType(cloudTaskAction),
			withLatestFrom(this.store.select(selCoreIsFirestoreConfigMissing)),
			filter(([, missing]) => !missing),
			switchMap(([{ task }]) => {

				switch (task.type) {

					case CloudTaskType.clicked:
						return this.syncService.uploadClicks();

					default:
						return EMPTY;

				}

			}),

		),
		{ dispatch: false }

	);

}
