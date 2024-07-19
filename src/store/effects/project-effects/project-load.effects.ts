import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as projectActions from 'store/actions/project.actions';

@Injectable()
export class ProjectLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.loadOne),
			switchMap(({ id }) =>

				Promise.all([

					Promise.resolve(id),
					this.localRepository.projects.getEntity(id),
					this.localRepository.projects.getSyncData(id),
					this.localRepository.projects.getRemoteMetadata(id)

				])
			),
			map(([id, project, syncData, remoteMetadata]) => projectActions.loadOneSuccess({ id, project, syncData, remoteMetadata }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.projects.list(),
					this.localRepository.projects.listSyncData(),
					this.localRepository.projects.listRemoteMetadata()

				])

			),
			map(([projects, syncData, remoteMetadata]) => projectActions.loadAllSuccess({ projects, syncData, remoteMetadata }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.projects.getSyncData(id)).pipe(

					map(syncData => projectActions.loadOneSyncDataSuccess({ syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(projectActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.projects.listRemoteMetadata()),
			map(remoteMetadata => projectActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

}
