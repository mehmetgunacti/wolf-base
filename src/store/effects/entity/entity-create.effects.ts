import { Injectable, inject } from '@angular/core';
import { Entity, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { entityActions } from 'store/actions';

@Injectable()
export class EntityCreateEffects {

	private coreActions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.coreActions$.pipe(

			ofType(entityActions.create),
			switchMap(({ entityType, entity }) =>

				from(
					this.localRepository.getRepository(entityType).create(entity)
				).pipe(
					map((entity: Entity) => entityActions.createSuccess({ entityType, entity }))
				)

			)

		)

	);

	createSuccessToLoadOneNote$ = createEffect(

		() => this.coreActions$.pipe(

			ofType(entityActions.createSuccess),
			map(({ entityType, entity }) => entityActions.loadOne({ entityType, id: entity.id }))

		)

	);

}
