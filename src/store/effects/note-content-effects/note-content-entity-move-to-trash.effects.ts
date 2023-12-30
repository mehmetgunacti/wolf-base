import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import * as actions from 'store/actions/note-content.actions';
import { showNotification } from 'store/actions/core-notification.actions';

@Injectable()
export class NoteContentEntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.moveToTrash),
			switchMap(({ id }) =>

				from(
					this.localRepository.noteContent.moveToTrash(id)
				).pipe(
					map(() => actions.moveToTrashSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.moveToTrashSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Note Content removed' }))

		)

	);

	loadOneNoteContentSync$ = createEffect(

		() => this.actions$.pipe(

			ofType(actions.moveToTrashSuccess),
			map(({ id }) => actions.loadOne({ id }))

		)

	);

}
