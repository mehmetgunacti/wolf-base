import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntityType, isEntityOfType } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { filter, map } from 'rxjs/operators';
import { coreActions, entityActions } from 'store/actions';

@Injectable()
export class WordUpdateEffects {

	private actions$: Actions = inject(Actions);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.word)),
			map(({ entityType }) => coreActions.showNotification({ severity: 'success', detail: `${AppEntities[entityType].label} updated` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.word)),
			map(({ id, entityType }) => coreActions.navigate({ url: [`/${AppEntities[entityType].plural}`, id] }))

		)

	);

}
