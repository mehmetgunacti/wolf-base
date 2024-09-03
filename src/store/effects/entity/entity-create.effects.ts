import { Injectable, inject } from '@angular/core';
import { Entity, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

	createSuccessToLoadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.createSuccess),
			map(({ entityType, entity }) => actions.loadOne({ entityType, id: entity.id }))

		)

	);

}
