import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as projectActions from 'store/actions/project.actions';
import { selProject_RemoteNew } from 'store/selectors/project-selectors/project-cloud.selectors';

@Injectable()
export class ProjectSyncRemoteNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.syncRemoteNew),
			withLatestFrom(this.store.select(selProject_RemoteNew)),
			switchMap(([, items]) =>

				this.syncService.downloadNew(EntityType.project, items).pipe(

					map(item => projectActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
