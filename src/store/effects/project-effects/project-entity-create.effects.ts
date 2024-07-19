import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService, Project } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as projectActions from 'store/actions/project.actions';

@Injectable()
export class ProjectEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.create),
			switchMap(({ project }) =>

				from(
					this.localRepository.projects.create(project)
				).pipe(
					map((project: Project) => projectActions.createSuccess({ project }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.createSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Project created' }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.createSuccess),
			map(({ project }) => navigate({ url: ['/projects', project.id] }))

		)

	);

	createSuccessToLoadOneProject$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.createSuccess),
			map(({ project }) => projectActions.loadOne({ id: project.id }))

		)

	);

}
