import { inject, Injectable } from '@angular/core';
import { AppEntityType, increase, next, Progress, QuizProgress } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import * as coreActions from 'store/actions/core-notification.actions';
import * as entityActions from 'store/actions/entity.actions';
import * as quizActions from 'store/actions/quiz-entry.actions';
import { selQuizEntry_EntityList } from 'store/selectors/entity/entity-quiz-entry.selectors';

@Injectable()
export class QuizEntryLogicEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);

	answeredRight$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.answeredRight),
			withLatestFrom(this.store.select(selQuizEntry_EntityList)),
			map(([{ quizProgressId }, entries]) => {

				const quizProgress = entries.find(e => e.id === quizProgressId);
				if (!quizProgress)
					return coreActions.showNotification({ severity: 'error', summary: 'QuizProcess Update Failure!', detail: `${quizProgressId} not found` });

				const entity: QuizProgress = {

					id: quizProgress.id,
					name: quizProgress.name,
					level: next(quizProgress.level),
					next: increase(next(quizProgress.level))

				};
				return entityActions.update({ entityType: AppEntityType.quizEntry, id: quizProgressId, entity });

			})

		)

	);

	closeAnswerDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.closeAnswerDialog),
			withLatestFrom(this.store.select(selQuizEntry_EntityList)),
			map(([{ quizProgressId }, entries]) => {

				const quizProgress = entries.find(e => e.id === quizProgressId);
				if (!quizProgress)
					return coreActions.showNotification({ severity: 'error', summary: 'QuizProcess Update Failure!', detail: `${quizProgressId} not found` });

				const entity: QuizProgress = {

					id: quizProgress.id,
					name: quizProgress.name,
					level: Progress.START,
					next: increase(Progress.LEVEL_ONE)

				};
				return entityActions.update({ entityType: AppEntityType.quizEntry, id: quizProgressId, entity });

			})

		)

	);

}
