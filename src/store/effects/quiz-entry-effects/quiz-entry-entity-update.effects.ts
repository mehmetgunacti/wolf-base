import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';

@Injectable()
export class QuizEntryEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.update),
			switchMap(({ id, quizEntry }) =>

				from(
					this.localRepository.quizEntries.update(id, quizEntry)
				).pipe(
					map(() => quizEntryActions.updateSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.updateSuccess),
			map(() => showNotification({ severity: 'success', detail: 'QuizEntry updated' }))

		)

	);

	loadOneQuizEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.updateSuccess),
			map(({ id }) => quizEntryActions.loadOne({ id }))

		)

	);

	loadOneQuizEntrySync$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.updateSuccess),
			map(({ id }) => quizEntryActions.loadOneSyncData({ id }))

		)

	);

}
