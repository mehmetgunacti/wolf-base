import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService, Note } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as noteActions from 'store/actions/note.actions';

@Injectable()
export class NoteEntityCreateEffects {

	// todo: remove later
	tmpCounter: number = 0;

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.create),
			switchMap(({ note }) =>

				from(
					this.localRepository.notes.create(note)
				).pipe(
					map((note: Note) => noteActions.createSuccess({ note }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.createSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Note created' }))

		)

	);

	createSuccessToLoadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.createSuccess),
			map(({ note }) => noteActions.loadOne({ id: note.id }))

		)

	);

}
