import { Injectable, inject } from '@angular/core';
import { SyncService, EntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as projectActions from 'store/actions/project.actions';
import { selProject_LocalNew } from 'store/selectors/project-selectors/project-cloud.selectors';

@Injectable()
export class ProjectSyncLocalNewEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalNew$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.syncLocalNew),
			withLatestFrom(this.store.select(selProject_LocalNew)),
			switchMap(([, items]) =>

				this.syncService.uploadNew(EntityType.project, items).pipe(

					map(item => projectActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
