import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as projectActions from 'store/actions/project.actions';

@Injectable()
export class ProjectEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.update),
			switchMap(({ id, project }) =>

				from(
					this.localRepository.projects.update(id, project)
				).pipe(
					map(() => projectActions.updateSuccess({ id }))
				)

			)

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.updateSuccess),
			map(({ id }) => navigate({ url: ['/projects', id] }))

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Project updated' }))

		)

	);

	loadOneProject$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.updateSuccess),
			map(({ id }) => projectActions.loadOne({ id }))

		)

	);

	loadOneProjectSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.updateSuccess),
			map(({ id }) => projectActions.loadOneSyncData({ id }))

		)

	);

}
