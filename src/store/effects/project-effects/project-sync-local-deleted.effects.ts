import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as projectActions from 'store/actions/project.actions';
import { selProject_LocalDeleted } from 'store/selectors/project-selectors/project-cloud.selectors';

@Injectable()
export class ProjectSyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.syncLocalDeleted),
			withLatestFrom(this.store.select(selProject_LocalDeleted)),
			switchMap(([, entities]) =>

				this.syncService.uploadDeleted(WolfEntity.project, entities).pipe(

					map(item => projectActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
