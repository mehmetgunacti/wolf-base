import { Injectable, inject } from '@angular/core';
import { AppEntities, Entity, LocalRepositoryService, Note } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as actions from 'store/actions/entity.actions';

@Injectable()
export class EntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.create),
			switchMap(({ entityType, entity }) =>

				from(
					this.localRepository.getRepository(entityType).create(entity)
				).pipe(
					map((entity: Entity) => actions.createSuccess({ entityType, entity }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.createSuccess),
			map(({ entityType }) => showNotification({ severity: 'success', detail: `${AppEntities[entityType].label} created` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.createSuccess),
			map(({ entity, entityType }) => navigate({ url: [`/${AppEntities[entityType].plural}`, entity.id] }))

		)

	);

	createSuccessToLoadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.createSuccess),
			map(({ entityType, entity }) => actions.loadOne({ entityType, id: entity.id }))

		)

	);

}
