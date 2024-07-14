import { Injectable, inject } from '@angular/core';
import { definitionName, LocalRepositoryService, QuizProgress } from '@lib';
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
			switchMap(({ definition }) =>

				from(
					this.localRepository.quizEntries.create({

						id: definition.id,
						name: definitionName(definition)

					})
				).pipe(
					map((quizEntry: QuizProgress) => quizEntryActions.createSuccess({ quizEntry }))
				)

			)

		)

	);

	createSuccessToNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.createSuccess),
			map(({ quizEntry }) => showNotification({ severity: 'success', summary: 'Schedule On', detail: `'${quizEntry.name}'`, icon: 'timer' }))

		)

	);

	createSuccessToLoadOneQuizEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.createSuccess),
			map(({ quizEntry }) => quizEntryActions.loadOne({ id: quizEntry.id }))

		)

	);

}
