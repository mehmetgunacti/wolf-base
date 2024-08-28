import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from 'store/actions/entity.actions';

@Injectable()
export class EntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.update),
			switchMap(({ entityType, id, entity }) =>

				from(
					this.localRepository.getRepository(entityType).update(id, entity)
				).pipe(
					map(() => actions.updateSuccess({ entityType, id }))
				)

			)

		)

	);

	loadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.updateSuccess),
			map(({ entityType, id }) => actions.loadOne({ entityType, id }))

		)

	);

	loadOneNoteSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.updateSuccess),
			map(({ entityType, id }) => actions.loadOneSyncData({ entityType, id }))

		)

	);

}
