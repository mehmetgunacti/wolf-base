import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as noteActions from 'store/actions/note.actions';

@Injectable()
export class NoteEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.update),
			switchMap(({ id, note }) =>

				from(
					this.localRepository.notes.update(id, note)
				).pipe(
					map(() => noteActions.updateSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Note updated' }))

		)

	);

	loadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.updateSuccess),
			map(({ id }) => noteActions.loadOne({ id }))

		)

	);

	loadOneNoteSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.updateSuccess),
			map(({ id }) => noteActions.loadOneSyncData({ id }))

		)

	);

}
