import { Injectable, inject } from '@angular/core';
import { SyncService, AppEntityType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as taskActions from 'store/actions/project-task.actions';
import { selTask_LocalUpdated } from 'store/selectors/project-task-selectors/task-cloud.selectors';

@Injectable()
export class TaskSyncLocalUpdatedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncLocalUpdated$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.syncLocalUpdated),
			withLatestFrom(this.store.select(selTask_LocalUpdated)),
			switchMap(([, items]) =>

				this.syncService.uploadUpdated(AppEntityType.task, items).pipe(

					map(item => taskActions.loadOne({ id: item.id }))

				)

			)

		)

	);

}
