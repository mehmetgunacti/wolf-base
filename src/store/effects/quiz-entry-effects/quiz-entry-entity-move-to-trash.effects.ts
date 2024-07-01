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
			switchMap(({ entry }) =>

				from(
					this.localRepository.quizEntries.moveToTrash(entry.id)
				).pipe(
					map(() => quizEntryActions.moveToTrashSuccess({ entry }))
				)

			)

		)

	);

	showNotification$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.moveToTrashSuccess),
			map(({ entry }) => showNotification({ severity: 'info', summary: 'Schedule Off', detail: `'${entry.name}'`, icon: 'timer_off' }))

		)

	);

	loadAllQuizEntries$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.moveToTrashSuccess),
			map(() => quizEntryActions.loadAll())

		)

	);

}
