import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as projectActions from 'store/actions/project.actions';
import { selProject_LocalDeletedRemoteDeleted } from 'store/selectors/project-selectors/project-cloud.selectors';

@Injectable()
export class ProjectSyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.syncDeletedDeleted),
			withLatestFrom(this.store.select(selProject_LocalDeletedRemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(AppEntityType.project, items).pipe(

					map(item => projectActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
