import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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
