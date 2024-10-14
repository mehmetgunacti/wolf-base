import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppEntities, AppEntityType } from '@constants';
import { isEntityOfType } from '@utils';
import { filter, map } from 'rxjs/operators';
import { coreActions, entityActions } from '@actions';

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
