import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntityType } from '@constants/entity.constant';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { isEntityOfType } from '@utils/helper.tool';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class NoteCreateEffects {

	private actions$: Actions = inject(Actions);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.note)),
			map(({ entity, entityType }) => coreActions.navigate({ url: [ `/${AppEntities[ entityType ].plural}`, entity.id ] }))

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.note)),
			map(({ entityType }) => coreActions.showNotification({ severity: 'success', detail: `${AppEntities[ entityType ].label} created` }))

		)

	);

}
