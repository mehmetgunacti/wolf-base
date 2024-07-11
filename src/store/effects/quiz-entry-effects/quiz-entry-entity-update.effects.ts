import { inject, Injectable } from '@angular/core';
import { increase, LocalRepositoryService, next, Progress, QuizProgress } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { LOCAL_REPOSITORY_SERVICE } from 'app/app.config';
import { from, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { showNotification } from 'store/actions/core-notification.actions';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';
import { selQuizEntry_array } from 'store/selectors/quiz-entry-selectors/quiz-entry-entities.selectors';

@Injectable()
export class QuizEntryEntityUpdateEffects {

	private actions$: Actions = inject(Actions);
	private store: Store = inject(Store);
	private localRepository: LocalRepositoryService = inject(LOCAL_REPOSITORY_SERVICE);

	update$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.update),
			withLatestFrom(this.store.select(selQuizEntry_array)),
			switchMap(([{ id, answeredRight }, entries]) => {

				const quizProgress = entries.find(e => e.id === id);
				if (!quizProgress)
					return of(showNotification({ severity: 'error', summary: 'QuizProcess Update Failure!', detail: `${id}` }));

				const p: QuizProgress = {

					id: quizProgress.id,
					name: quizProgress.name,
					level: answeredRight ? next(quizProgress.level) : Progress.START,
					next: answeredRight ? increase(next(quizProgress.level)) : increase(Progress.LEVEL_ONE)

				};

				return from(
					this.localRepository.quizEntries.update(id, p)
				).pipe(
					map(() => answeredRight ? quizEntryActions.updateSuccess({ id }) : quizEntryActions.updateFailure({ id }))
				)

			})

		)

	);

	loadOneQuizEntry$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.updateSuccess, quizEntryActions.updateFailure),
			map(({ id }) => quizEntryActions.loadOne({ id }))

		)

	);

	loadOneQuizEntrySync$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.updateSuccess, quizEntryActions.updateFailure),
			map(({ id }) => quizEntryActions.loadOneSyncData({ id }))

		)

	);

	// setNow$ = createEffect(

	// 	() => this.actions$.pipe(

	// 		ofType(quizEntryActions.updateSuccess, quizEntryActions.updateFailure),
	// 		map(() => quizEntryActions.setNow())

	// 	)

	// );



}
