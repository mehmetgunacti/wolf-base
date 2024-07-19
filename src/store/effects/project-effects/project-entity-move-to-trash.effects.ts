import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as projectActions from 'store/actions/project.actions';

@Injectable()
export class ProjectEntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.moveToTrash),
			switchMap(({ id }) =>

				from(
					this.localRepository.projects.moveToTrash(id)
				).pipe(
					map(() => projectActions.moveToTrashSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.moveToTrashSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Project removed' }))

		)

	);

	loadAllProjects$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.moveToTrashSuccess),
			map(({ id }) => projectActions.loadAll())

		)

	);

}
