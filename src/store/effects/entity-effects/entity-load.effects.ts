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
			switchMap(({ entityType, id }) =>

				from(Promise.all([

					this.localRepository.getRepository(entityType).getEntity(id),
					this.localRepository.getRepository(entityType).getSyncData(id),
					this.localRepository.getRepository(entityType).getRemoteMetadata(id)

				])).pipe(
					map(([entity, syncData, remoteMetadata]) => actions.loadOneSuccess({ entityType, id, entity, syncData, remoteMetadata }))
				)
			)

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.loadAll),
			switchMap(({ entityType }) =>

				from(Promise.all([

					this.localRepository.getRepository(entityType).list(),
					this.localRepository.getRepository(entityType).listSyncData(),
					this.localRepository.getRepository(entityType).listRemoteMetadata()

				])).pipe(
					map(([entities, syncData, remoteMetadata]) => actions.loadAllSuccess({ entityType, entities, syncData, remoteMetadata }))
				)

			)

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.loadOneSyncData),
			switchMap(({ entityType, id }) =>

				from(this.localRepository.getRepository(entityType).getSyncData(id)).pipe(

					map(syncData => actions.loadOneSyncDataSuccess({ entityType, syncData }))

				)

			)

		)

	);

	loadAllRemoteMetadata$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.loadAllRemoteMetadata),
			switchMap(({ entityType }) =>

				from(
					this.localRepository.getRepository(entityType).listRemoteMetadata()
				).pipe(
					map(remoteMetadata => actions.loadAllRemoteMetadataSuccess({ entityType, remoteMetadata }))
				)

			)

		)

	);

}
