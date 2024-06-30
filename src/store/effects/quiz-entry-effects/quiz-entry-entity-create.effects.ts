import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService, QuizEntry } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import { showNotification } from 'store/actions/core-notification.actions';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';

@Injectable()
export class QuizEntryEntityCreateEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	create$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.create),
			switchMap(({ quizEntry }) =>

				from(
					this.localRepository.quizEntries.create(quizEntry)
				).pipe(
					map((quizEntry: QuizEntry) => quizEntryActions.createSuccess({ quizEntry }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.createSuccess),
			map(() => showNotification({ severity: 'success', detail: 'QuizEntry created' }))

		)

	);

	createSuccessToLoadOneQuizEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.createSuccess),
			map(({ quizEntry }) => quizEntryActions.loadOne({ id: quizEntry.id }))

		)

	);

}
