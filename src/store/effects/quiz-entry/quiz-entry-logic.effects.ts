import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { quizEntryActions } from '@actions/quiz-entry.actions';
import { inject, Injectable } from '@angular/core';
import { AppEntityType } from '@constants/entity.constant';
import { increase, next, Progress } from '@constants/quiz.constant';
import { QuizEntry } from '@models/quiz.model';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { selQuizEntry_EntityList } from '@selectors/entity/entity-quiz-entry.selectors';
import { map, withLatestFrom } from 'rxjs/operators';

@Injectable()
export class QuizEntryLogicEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);

	answeredRight$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.answeredRight),
			withLatestFrom(this.store.select(selQuizEntry_EntityList)),
			map(([ { quizEntryId }, entries ]) => {

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

	answeredWrong$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.answeredWrong),
			withLatestFrom(this.store.select(selQuizEntry_EntityList)),
			map(([ { word }, entries ]) => {

				const quizEntryId = word.definitions[ 0 ].id;
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
