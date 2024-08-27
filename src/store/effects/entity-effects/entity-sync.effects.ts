import { inject, Injectable } from '@angular/core';
import { AppEntityType, SyncService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { merge, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { downloadRemoteMetadata } from 'store/actions/cloud.actions';
import { loadAllRemoteMetadata } from 'store/actions/entity.actions';

@Injectable()
export class EntitySyncEffects {

	private actions$: Actions = inject(Actions);
	private syncService: SyncService = inject(SYNC_SERVICE);

	downloadRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(downloadRemoteMetadata),
			switchMap(() => merge(...this.createOps())),
			tap(console.log)

		)

	);

	private createOps(): Observable<Action>[] {

		return Object.values(AppEntityType).map(entityType =>

			this.syncService.downloadMetadata(entityType).pipe(
				map(() => loadAllRemoteMetadata({ entityType }))
			)

		);

	}

}
