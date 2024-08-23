import { Injectable, inject } from '@angular/core';
import { AppEntityType, LocalRepositoryService, NoteContent } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as actionNoteContent from 'store/actions/note-content.actions';
import * as actionNote from 'store/actions/note.actions';
import * as entityActions from 'store/actions/entity.actions';

@Injectable()
export class NoteContentEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionNoteContent.create),
			switchMap(({ content }) =>

				from(
					this.localRepository.noteContent.create(content)
				).pipe(
					map((content: NoteContent) => actionNoteContent.createSuccess({ content }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionNoteContent.createSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Content created' }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionNoteContent.createSuccess),
			map(({ content }) => navigate({ url: ['/notes', content.id] }))

		)

	);

	createSuccessToLoadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionNoteContent.createSuccess),
			map(({ content }) => actionNoteContent.loadOne({ id: content.id }))

		)

	);

	loadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(actionNoteContent.createSuccess),
			map(({ content }) => entityActions.loadOne({ entityType: AppEntityType.note, id: content.id }))

		)

	);

}
