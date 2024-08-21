import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as projectActions from 'store/actions/project.actions';
import { selProject_RemoteDeleted } from 'store/selectors/project-selectors/project-cloud.selectors';

@Injectable()
export class ProjectSyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.syncRemoteDeleted),
			withLatestFrom(this.store.select(selProject_RemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(EntityType.project, items).pipe(

					map(item => projectActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
