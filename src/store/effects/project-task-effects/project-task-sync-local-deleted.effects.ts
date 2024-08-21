import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as taskActions from 'store/actions/project-task.actions';
import { selTask_LocalDeleted } from 'store/selectors/project-task-selectors/task-cloud.selectors';

@Injectable()
export class TaskSyncLocalDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.syncLocalDeleted),
			withLatestFrom(this.store.select(selTask_LocalDeleted)),
			switchMap(([, entities]) =>

				this.syncService.uploadDeleted(AppEntityType.task, entities).pipe(

					map(item => taskActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
