import { Dialog } from '@angular/cdk/dialog';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UUID } from '@constants';
// import { QuizAnswerContainerComponent } from 'modules/home/containers/quiz-answer-container/quiz-answer-container.component';
import { filter, map } from 'rxjs/operators';
import { coreActions, quizEntryActions } from '@actions';

@Injectable()
export class QuizUIEffects {

	private actions$: Actions = inject(Actions);
	private dialogService: Dialog = inject(Dialog);

	// private dialogRef: DialogRef<null, QuizAnswerContainerComponent> | null = null;

	answeredWrong$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.answeredWrong),
			// map(() => {
			// 	this.dialogRef = this.dialogService.open(QuizAnswerContainerComponent, { closeOnNavigation: true });
			// })

		),
		{ dispatch: false }

	);

	closeShowAnswerDialog$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.closeAnswerDialog),
			//tap(() => this.dialogRef?.close())

		),
		{ dispatch: false }

	);

	navgiateEditWord$ = createEffect(

		() => this.actions$.pipe(

			ofType(quizEntryActions.closeAnswerDialog),
			map(({ editWord }) => editWord),
			filter((wordId): wordId is UUID => !!wordId),
			map(wordId => coreActions.navigate({ url: [ '/words', wordId, 'edit' ] }))

		)

	);

}
