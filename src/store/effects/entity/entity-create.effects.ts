import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Entity } from '@models';
import { LocalRepositoryService } from '@libServices';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LOCAL_REPOSITORY_SERVICE } from 'services';
import { entityActions } from '@actions';

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
