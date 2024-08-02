import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as taskActions from 'store/actions/project-task.actions';
import { selTask_LocalDeletedRemoteDeleted } from 'store/selectors/project-task-selectors/task-cloud.selectors';

@Injectable()
export class TaskSyncDeletedDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncDeletedDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.syncDeletedDeleted),
			withLatestFrom(this.store.select(selTask_LocalDeletedRemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(WolfEntity.task, items).pipe(

					map(item => taskActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
