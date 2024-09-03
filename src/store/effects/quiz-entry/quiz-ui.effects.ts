import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { UUID } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuizAnswerContainerComponent } from 'modules/home/containers/quiz-answer-container/quiz-answer-container.component';
import { filter, map, tap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import * as quizActions from 'store/actions/quiz-entry.actions';

@Injectable()
export class QuizUIEffects {

	private actions$: Actions = inject(Actions);
	private dialogService: Dialog = inject(Dialog);

	private dialogRef: DialogRef<null, QuizAnswerContainerComponent> | null = null;

	answeredWrong$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.answeredWrong),
			map(() => {
				this.dialogRef = this.dialogService.open(QuizAnswerContainerComponent, { closeOnNavigation: true });
			})

		),
		{ dispatch: false }

	);

	closeShowAnswerDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.closeAnswerDialog),
			tap(() => this.dialogRef?.close())

		),
		{ dispatch: false }

	);

	navgiateEditWord$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.closeAnswerDialog),
			map(({ editWord }) => editWord),
			filter((wordId): wordId is UUID => !!wordId),
			map(wordId => navigate({ url: ['/words', wordId, 'edit'] }))

		)

	);

}
