import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntityType, isEntityOfType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { coreNavigationActions, coreNotificationActions, entityActions } from 'store/actions';

@Injectable()
export class NoteContentUpdateEffects {

	private actions$: Actions = inject(Actions);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.noteContent)),
			map(({ entityType }) => coreNotificationActions.showNotification({ severity: 'success', detail: `${AppEntities[entityType].label} updated` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.noteContent)),
			map(({ id }) => coreNavigationActions.navigate({ url: [`/notes`, id] }))

		)

	);

}
