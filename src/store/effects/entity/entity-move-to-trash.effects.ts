import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppEntities } from '@constants';
import { LocalRepositoryService } from '@libServices';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { LOCAL_REPOSITORY_SERVICE } from 'services';
import { coreActions, entityActions } from '@actions';

@Injectable()
export class EntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.moveToTrash),
			switchMap(({ entityType, id }) =>

				from(
					this.localRepository.getRepository(entityType).moveToTrash(id)
				).pipe(
					map(() => entityActions.moveToTrashSuccess({ entityType, id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.moveToTrashSuccess),
			map(({ entityType }) => coreActions.showNotification({ severity: 'success', detail: `${AppEntities[ entityType ].label} removed` }))

		)

	);

	loadAll$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.moveToTrashSuccess),
			map(({ entityType, id }) => entityActions.loadOne({ entityType, id }))

		)

	);

}
