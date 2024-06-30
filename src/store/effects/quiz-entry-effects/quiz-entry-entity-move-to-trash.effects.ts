import { Injectable, inject } from '@angular/core';
import { LocalRepositoryService } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';

@Injectable()
export class QuizEntryEntityMoveToTrashEffects {

	private actions$: Actions = inject(Actions);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	moveToTrash$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.moveToTrash),
			switchMap(({ id }) =>

				from(
					this.localRepository.quizEntries.moveToTrash(id)
				).pipe(
					map(() => quizEntryActions.moveToTrashSuccess({ id }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.moveToTrashSuccess),
			map(() => showNotification({ severity: 'success', detail: 'QuizEntry removed' }))

		)

	);

	loadAllQuizEntries$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.moveToTrashSuccess),
			map(({ id }) => quizEntryActions.loadAll())

		)

	);

}
