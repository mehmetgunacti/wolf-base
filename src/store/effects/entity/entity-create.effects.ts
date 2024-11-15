import { entityActions } from '@actions/entity.actions';
import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@libServices/local-repository.service';
import { Entity } from '@models/entity.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from '@services/repository.service';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

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
