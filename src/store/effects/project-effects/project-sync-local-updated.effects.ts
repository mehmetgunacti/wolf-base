import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as projectActions from 'store/actions/project.actions';
import { selProject_LocalUpdated } from 'store/selectors/project-selectors/project-cloud.selectors';

@Injectable()
export class ProjectSyncLocalUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.syncLocalUpdated),
			withLatestFrom(this.store.select(selProject_LocalUpdated)),
			switchMap(([, items]) =>

				this.syncService.uploadUpdated(WolfEntity.project, items).pipe(

					map(item => projectActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
