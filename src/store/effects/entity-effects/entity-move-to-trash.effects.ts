import { Injectable, inject } from '@angular/core';
import { AppEntities, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as actions from 'store/actions/entity.actions';

@Injectable()
export class EntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.moveToTrash),
			switchMap(({ entityType, id }) =>

				from(
					this.localRepository.getRepository(entityType).moveToTrash(id)
				).pipe(
					map(() => actions.moveToTrashSuccess({ entityType, id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.moveToTrashSuccess),
			map(({ entityType, id }) => showNotification({ severity: 'success', detail: `${AppEntities[entityType].label} removed` }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.moveToTrashSuccess),
			map(({ entityType, id }) => actions.loadOne({ entityType, id }))

		)

	);

}
