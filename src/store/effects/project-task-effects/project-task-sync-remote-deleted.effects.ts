import { Injectable, inject } from '@angular/core';
import { SyncService, WolfEntity } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { SYNC_SERVICE } from 'app/app.config';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import * as taskActions from 'store/actions/project-task.actions';
import { selTask_RemoteDeleted } from 'store/selectors/project-task-selectors/task-cloud.selectors';

@Injectable()
export class TaskSyncRemoteDeletedEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private syncService: SyncService = inject(SYNC_SERVICE);

	syncRemoteDeleted$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.syncRemoteDeleted),
			withLatestFrom(this.store.select(selTask_RemoteDeleted)),
			switchMap(([, items]) =>

				this.syncService.downloadDeleted(WolfEntity.task, items).pipe(

					map(item => taskActions.unloadOne({ id: item.id }))

				)

			)

		)

	);

}
