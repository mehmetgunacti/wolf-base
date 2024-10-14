import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AppEntities, AppEntityType } from '@constants';
import { isEntityOfType } from '@utils';
import { filter, map } from 'rxjs/operators';
import { coreActions, entityActions } from '@actions';

@Injectable()
export class NoteContentCreateEffects {

	private actions$: Actions = inject(Actions);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.noteContent)),
			map(({ entityType }) => coreActions.showNotification({ severity: 'success', detail: `${AppEntities[ entityType ].label} created` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.createSuccess),
			filter(isEntityOfType(AppEntityType.noteContent)),
			map(({ entity }) => coreActions.navigate({ url: [ `/notes`, entity.id ] }))

		)

	);

}
