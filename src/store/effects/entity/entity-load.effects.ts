import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { forkJoin, from, of } from 'rxjs';
import { concatMap, map, switchMap, toArray } from 'rxjs/operators';
import { entityActions } from 'store/actions';

@Injectable()
export class EntityLoadEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.loadOne),
			switchMap(({ entityType, id }) =>

				from(Promise.all([

					this.localRepository.getRepository(entityType).getEntity(id),
					this.localRepository.getRepository(entityType).getSyncData(id),
					this.localRepository.getRepository(entityType).getRemoteMetadata(id)

				])).pipe(
					map(([entity, syncData, remoteMetadata]) => entityActions.loadOneSuccess({ entityType, id, entity, syncData, remoteMetadata }))
				)
			)

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.loadAll),
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
			map(data => entityActions.loadAllSuccess({ data }))

		)

	);

	loadOneSyncData$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.loadOneSyncData),
			switchMap(({ entityType, id }) =>

				from(this.localRepository.getRepository(entityType).getSyncData(id)).pipe(

					map(syncData => entityActions.loadOneSyncDataSuccess({ entityType, syncData }))

				)

			)

		)

	);

}
