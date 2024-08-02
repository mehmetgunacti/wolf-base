import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as taskActions from 'store/actions/project-task.actions';

@Injectable()
export class TaskLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.loadOne),
			switchMap(({ id }) =>

				Promise.all([

					Promise.resolve(id),
					this.localRepository.tasks.getEntity(id),
					this.localRepository.tasks.getSyncData(id),
					this.localRepository.tasks.getRemoteMetadata(id)

				])
			),
			map(([id, task, syncData, remoteMetadata]) => taskActions.loadOneSuccess({ id, task, syncData, remoteMetadata }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.loadAll),
			switchMap(() =>

				Promise.all([

					this.localRepository.tasks.list(),
					this.localRepository.tasks.listSyncData(),
					this.localRepository.tasks.listRemoteMetadata()

				])

			),
			map(([tasks, syncData, remoteMetadata]) => taskActions.loadAllSuccess({ tasks, syncData, remoteMetadata }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.loadOneSyncData),
			switchMap(({ id }) =>

				from(this.localRepository.tasks.getSyncData(id)).pipe(

					map(syncData => taskActions.loadOneSyncDataSuccess({ syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(taskActions.loadAllRemoteMetadata),
			switchMap(() => this.localRepository.tasks.listRemoteMetadata()),
			map(remoteMetadata => taskActions.loadAllRemoteMetadataSuccess({ remoteMetadata }))

		)

	);

}
