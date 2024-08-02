import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService, Task } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as taskActions from 'store/actions/project-task.actions';

@Injectable()
export class TaskEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.create),
			switchMap(({ task }) =>

				from(
					this.localRepository.tasks.create(task)
				).pipe(
					map((task: Task) => taskActions.createSuccess({ task }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.createSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Task created' }))

		)

	);

	createSuccessToLoadOneTask$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.createSuccess),
			map(({ task }) => taskActions.loadOne({ id: task.id }))

		)

	);

}
