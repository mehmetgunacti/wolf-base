import { Injectable, inject } from '@angular/core';
import { Entity, LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { createEntity, createEntitySuccess, deleteEntity, deleteEntitySuccess, updateEntity, updateEntitySuccess } from 'store/actions/core-entity.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class CoreEntityEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(createEntity),
			switchMap(params =>

				from(
					this.localRepository.getRepository(params.entity).create(params.data)
				).pipe(
					map((data: Entity) => createEntitySuccess({ entity: params.entity, id: data.id }))
				)

			)

		)

	);

	createSuccessNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(createEntitySuccess),
			map(({ entity }) => showNotification({ severity: 'success', detail: entity + ' created' }))

		)

	);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(updateEntity),
			switchMap(({ id, data, entity }) =>

				from(
					this.localRepository.getRepository(entity).update(id, data)
				).pipe(

					map(() => updateEntitySuccess({ id, entity }))

				)

			)

		)

	);

	updateSuccessNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(updateEntitySuccess),
			map(({ entity }) => showNotification({ severity: 'success', detail: entity + ' updated' }))

		)

	);

	delete$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteEntity),
			switchMap(({ id, entity }) =>

				from(
					this.localRepository.bookmarks.moveToTrash(id)
				).pipe(

					map(() => deleteEntitySuccess({ entity }))

				)

			)

		)

	);

	deleteSuccessNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(deleteEntitySuccess),
			map(({ entity }) => showNotification({ severity: 'success', detail: entity + ' deleted' }))

		)

	);

}
