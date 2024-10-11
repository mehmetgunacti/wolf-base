import { inject, Injectable } from '@angular/core';
import { AppEntityType, increase, next, Progress, QuizEntry } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, withLatestFrom } from 'rxjs/operators';
import { coreActions, entityActions, quizEntryActions } from 'store/actions';
import { selQuizEntry_EntityList } from 'store/selectors/entity/entity-quiz-entry.selectors';

@Injectable()
export class QuizEntryLogicEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);

	answeredRight$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.answeredRight),
			withLatestFrom(this.store.select(selQuizEntry_EntityList)),
			map(([{ quizEntryId }, entries]) => {

				const quizEntry = entries.find(e => e.id === quizEntryId);
				if (!quizEntry)
					return coreActions.showNotification({ severity: 'error', summary: 'QuizEntry Update Failure!', detail: `${quizEntryId} not found` });

				const entity: QuizEntry = {

					id: quizEntry.id,
					name: quizEntry.name,
					level: next(quizEntry.level),
					next: increase(next(quizEntry.level)),
					question: quizEntry.question === 'term' ? 'definition' : 'term'

				};
				return entityActions.update({ entityType: AppEntityType.quizEntry, id: quizEntryId, entity });

			})

		)

	);

	closeAnswerDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.closeAnswerDialog),
			withLatestFrom(this.store.select(selQuizEntry_EntityList)),
			map(([{ quizEntryId }, entries]) => {

				const quizEntry = entries.find(e => e.id === quizEntryId);
				if (!quizEntry)
					return coreActions.showNotification({ severity: 'error', summary: 'QuizEntry Update Failure!', detail: `${quizEntryId} not found` });

				const entity: QuizEntry = {

					id: quizEntry.id,
					name: quizEntry.name,
					level: Progress.START,
					next: increase(Progress.LEVEL_ONE),
					question: quizEntry.question === 'term' ? 'definition' : 'term'

				};
				return entityActions.update({ entityType: AppEntityType.quizEntry, id: quizEntryId, entity });

			})

		)

	);

}
