import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as taskActions from 'store/actions/project-task.actions';

@Injectable()
export class TaskEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.update),
			switchMap(({ id, task }) =>

				from(
					this.localRepository.tasks.update(id, task)
				).pipe(
					map(() => taskActions.updateSuccess({ id }))
				)

			)

		)

	);

	// openTaskDialog$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(taskActions.updateSuccess),
	// 		map(({ id }) => taskActions.openTaskDialog({ id }))

	// 	)

	// );

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Task updated' }))

		)

	);

	loadOneTask$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.updateSuccess),
			map(({ id }) => taskActions.loadOne({ id }))

		)

	);

	loadOneTaskSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.updateSuccess),
			map(({ id }) => taskActions.loadOneSyncData({ id }))

		)

	);

}
