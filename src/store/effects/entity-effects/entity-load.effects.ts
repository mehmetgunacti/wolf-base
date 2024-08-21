import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';

@Injectable()
export class EntityLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.loadOne),
			switchMap(({ entityName, id }) =>

				from(Promise.all([

					this.localRepository.getRepository(entityName).getEntity(id),
					this.localRepository.getRepository(entityName).getSyncData(id),
					this.localRepository.getRepository(entityName).getRemoteMetadata(id)

				])).pipe(
					map(([entity, syncData, remoteMetadata]) => actions.loadOneSuccess({ entityName, id, entity, syncData, remoteMetadata }))
				)
			)

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.loadAll),
			switchMap(({ entityName }) =>

				from(Promise.all([

					this.localRepository.getRepository(entityName).list(),
					this.localRepository.getRepository(entityName).listSyncData(),
					this.localRepository.getRepository(entityName).listRemoteMetadata()

				])).pipe(
					map(([entities, syncData, remoteMetadata]) => actions.loadAllSuccess({ entityName, entities, syncData, remoteMetadata }))
				)

			)

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.loadOneSyncData),
			switchMap(({ entityName, id }) =>

				from(this.localRepository.getRepository(entityName).getSyncData(id)).pipe(

					map(syncData => actions.loadOneSyncDataSuccess({ entityName, syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.loadAllRemoteMetadata),
			switchMap(({ entityName }) =>

				from(
					this.localRepository.getRepository(entityName).listRemoteMetadata()
				).pipe(
					map(remoteMetadata => actions.loadAllRemoteMetadataSuccess({ entityName, remoteMetadata }))
				)

			)

		)

	);

}
