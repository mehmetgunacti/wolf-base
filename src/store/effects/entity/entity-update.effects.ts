import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LocalRepositoryService } from '@libServices';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LOCAL_REPOSITORY_SERVICE } from 'services';
import { entityActions } from '@actions';

@Injectable()
export class EntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.update),
			switchMap(({ entityType, id, entity }) =>

				from(
					this.localRepository.getRepository(entityType).update(id, entity)
				).pipe(
					map(() => entityActions.updateSuccess({ entityType, id }))
				)

			)

		)

	);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			map(({ entityType, id }) => entityActions.loadOne({ entityType, id }))

		)

	);

	loadOneSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			map(({ entityType, id }) => entityActions.loadOneSyncData({ entityType, id }))

		)

	);

}
