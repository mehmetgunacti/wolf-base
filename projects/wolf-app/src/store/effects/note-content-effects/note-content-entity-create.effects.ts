import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService, NoteContent } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as contentActions from 'store/actions/note-content.actions';

@Injectable()
export class NoteContentEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(contentActions.create),
			switchMap(({ content }) =>

				from(
					this.localRepository.noteContent.create(content)
				).pipe(
					map((content: NoteContent) => contentActions.createSuccess({ content }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(contentActions.createSuccess),
			map(() => showNotification({ severity: 'success', detail: 'Content created' }))

		)

	);

	navigate$ = createEffect(

		() => this.actions$.pipe(

			ofType(contentActions.createSuccess),
			map(({ content }) => navigate({ url: ['/notes', content.id] }))

		)

	);

	createSuccessToLoadOneNote$ = createEffect(

		() => this.actions$.pipe(

			ofType(contentActions.createSuccess),
			map(({ content }) => contentActions.loadOne({ id: content.id }))

		)

	);

}
