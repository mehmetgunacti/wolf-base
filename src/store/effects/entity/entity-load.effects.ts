import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { forkJoin, from, of } from 'rxjs';
import { concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';
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
			switchMap(({ filter }) =>

				from(filter).pipe(

					concatMap(({ entityType, loadEntities, loadSyncData, loadRemoteMetadata }) => forkJoin({

						entityType: of(entityType),
						entities: loadEntities ? from(this.localRepository.getRepository(entityType).list()) : of([]),
						syncData: loadSyncData ? from(this.localRepository.getRepository(entityType).listSyncData()) : of([]),
						remoteMetadata: loadRemoteMetadata ? from(this.localRepository.getRepository(entityType).listRemoteMetadata()) : of([])

					})),
					toArray()

				)

			),
			map(data => actions.loadAllSuccess({ data }))

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

}
