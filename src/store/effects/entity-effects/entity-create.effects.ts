import { Injectable, inject } from '@angular/core';
import { Entity, LocalRepositoryService, Note } from '@lib';
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
			switchMap(({ entityName, entity }) =>

				from(
					this.localRepository.getRepository(entityName).create(entity)
				).pipe(
					map((entity: Entity) => actions.createSuccess({ entityName, entity }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.createSuccess),
			map(({entityName}) => showNotification({ severity: 'success', detail: `${entityName.label} created` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.createSuccess),
			map(({ entity, entityName }) => navigate({ url: [`/${entityName.plural}`, entity.id] }))

		)

	);

	createSuccessToLoadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.createSuccess),
			map(({ entityName, entity }) => actions.loadOne({ entityName, id: entity.id }))

		)

	);

}
