import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as noteActions from 'store/actions/note.actions';

@Injectable()
export class NoteEntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.moveToTrash),
			switchMap(({ id }) =>

				from(
					this.localRepository.notes.moveToTrash(id)
				).pipe(
					map(() => noteActions.moveToTrashSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.moveToTrashSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Note removed' }))

		)

	);

	loadAllNotes$ = createEffect(

		() => this.actions$.pipe(

			ofType(noteActions.moveToTrashSuccess),
			map(({ id }) => noteActions.loadAll())

		)

	);

}
