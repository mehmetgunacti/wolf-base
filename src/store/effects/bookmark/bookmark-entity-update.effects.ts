import { bookmarkActions } from '@actions/bookmark.actions';
import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { inject, Injectable } from '@angular/core';
import { AppEntities, AppEntityType } from '@constants/entity.constant';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { isEntityOfType } from '@utils/helper.tool';
import { filter, map } from 'rxjs/operators';

@Injectable()
export class BookmarkEntityUpdateEffects {

	private actions$: Actions = inject(Actions);

	editSuccess$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.bookmark)),
			map(() => bookmarkActions.editSuccess())

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.bookmark)),
			map(({ entityType }) => coreActions.showNotification({ severity: 'success', detail: `${AppEntities[ entityType ].label} updated` }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(entityActions.updateSuccess),
			filter(isEntityOfType(AppEntityType.bookmark)),
			map(({ id, entityType }) => coreActions.navigate({ url: [ `/${AppEntities[ entityType ].plural}` ], queryParams: { id } }))

		)

	);

}
