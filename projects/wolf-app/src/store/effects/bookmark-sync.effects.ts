import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap } from 'rxjs/operators';
import { loadAllRemoteMetadata } from 'store/actions/bookmark.actions';
import { startSync } from 'store/actions/cloud.actions';

@Injectable()
export class BookmarkSyncEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SYNC_SERVICE);

	startSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(startSync),
			switchMap(() =>

				this.syncService.downloadMetadata(WolfEntity.bookmark).pipe(
					map(() => loadAllRemoteMetadata())
				)

			)

		)

	);

}
