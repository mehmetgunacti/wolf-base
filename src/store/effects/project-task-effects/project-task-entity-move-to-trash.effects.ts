import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as taskActions from 'store/actions/project-task.actions';

@Injectable()
export class TaskEntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.moveToTrash),
			switchMap(({ id }) =>

				from(
					this.localRepository.tasks.moveToTrash(id)
				).pipe(
					map(() => taskActions.moveToTrashSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.moveToTrashSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Task removed' }))

		)

	);

	loadAllTasks$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.moveToTrashSuccess),
			map(({ id }) => taskActions.loadAll())

		)

	);

}
