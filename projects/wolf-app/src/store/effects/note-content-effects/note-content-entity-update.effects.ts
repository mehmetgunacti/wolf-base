import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as actions from 'store/actions/note-content.actions';

@Injectable()
export class NoteContentEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.update),
			switchMap(({ id, content }) =>

				from(
					this.localRepository.noteContent.update(id, content)
				).pipe(
					map(() => actions.updateSuccess({ id }))
				)

			)

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.updateSuccess),
			map(({ id }) => navigate({ url: ['/notes', id] }))

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Note Content updated' }))

		)

	);

	loadOne$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.updateSuccess),
			map(({ id }) => actions.loadOne({ id }))

		)

	);

	loadOneSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.updateSuccess),
			map(({ id }) => actions.loadOneSyncData({ id }))

		)

	);

}
