import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Injectable, inject } from '@angular/core';
import { AppEntityType, UUID } from '@lib';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { QuizAnswerContainerComponent } from 'modules/home/containers/quiz-answer-container/quiz-answer-container.component';
import { filter, map, tap } from 'rxjs/operators';
import { navigate } from 'store/actions/core-navigation.actions';
import * as quizActions from 'store/actions/quiz-entry.actions';
import * as entityActions from 'store/actions/entity.actions';

@Injectable()
export class QuizUIEffects {

	private actions$: Actions = inject(Actions);
	private dialogService: Dialog = inject(Dialog);

	private dialogRef: DialogRef<null, QuizAnswerContainerComponent> | null = null;

	openShowAnswerDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.openShowAnswerDialog),
			map(() => {
				this.dialogRef = this.dialogService.open(QuizAnswerContainerComponent, { closeOnNavigation: true });
			})

		),
		{ dispatch: false }

	);

	closeShowAnswerDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.closeShowAnswerDialog),
			tap(() => this.dialogRef?.close())

		),
		{ dispatch: false }

	);

	updateAnswer$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.closeShowAnswerDialog),
			map(({ quizProgressId }) => entityActions.update({ entityType: AppEntityType.quizEntry, id: quizProgressId, entity: { answeredRight: false } }))

		)

	);

	editWord$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizActions.closeShowAnswerDialog),
			map(({ editWord }) => editWord),
			filter((wordId): wordId is UUID => !!wordId),
			map(wordId => navigate({ url: ['/words', wordId, 'edit'] }))

		)

	);

}
