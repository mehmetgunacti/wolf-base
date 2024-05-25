import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as actionsNoteContent from 'store/actions/note-content.actions';
import * as actionsNote from 'store/actions/note.actions';

@Injectable()
export class NoteContentEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionsNoteContent.update),
			switchMap(({ id, content }) =>

				from(
					this.localRepository.noteContent.update(id, content)
				).pipe(
					map(() => actionsNoteContent.updateSuccess({ id }))
				)

			)

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionsNoteContent.updateSuccess),
			map(({ id }) => navigate({ url: ['/notes', id] }))

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionsNoteContent.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Note Content updated' }))

		)

	);

	loadOneNoteContent$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionsNoteContent.updateSuccess),
			map(({ id }) => actionsNoteContent.loadOne({ id }))

		)

	);

	loadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionsNoteContent.updateSuccess),
			map(({ id }) => actionsNote.loadOne({ id }))

		)

	);

}
