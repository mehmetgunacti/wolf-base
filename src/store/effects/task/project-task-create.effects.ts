import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntityType, isEntityOfType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { coreNotificationActions, entityActions } from 'store/actions';

@Injectable()
export class TaskCreateEffects {

	private actions$: Actions = inject(Actions);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.task)),
			map(({ entityType }) => coreNotificationActions.showNotification({ severity: 'success', detail: `${AppEntities[entityType].label} created` }))

		)

	);

}
