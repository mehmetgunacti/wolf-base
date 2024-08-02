import { DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, Signal, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngrx/store';
import { UUID, Word } from 'lib';
import { dialogFadeOutTrigger } from 'services/animation-aware-dialog.service';
import { closeShowAnswerDialog } from 'store/actions/quiz-entry.actions';
import { selQuiz_answer } from 'store/selectors/quiz-entry-selectors/quiz.selectors';

@Component({
	selector: 'app-quiz-answer-container',
	templateUrl: './quiz-answer-container.component.html',
	styleUrls: ['./quiz-answer-container.component.scss'],
	animations: [dialogFadeOutTrigger],
	host: { '[@fadeOut]': '' },
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizAnswerContainerComponent {

	private store: Store = inject(Store);
	private dialogRef: DialogRef<string> = inject(DialogRef);

	protected word: Signal<Word | null> = this.store.selectSignal(selQuiz_answer);

	constructor() {

		this.dialogRef.disableClose = true; // or else backdrop clicks won't work
		this.dialogRef.backdropClick.pipe(
			takeUntilDestroyed()
		).subscribe(() => {

			const w = this.word();
			if (w)
				this.onClose(w.definitions[0].id);

		});

	}

	onClose(quizProgressId: UUID): void {

		this.store.dispatch(closeShowAnswerDialog({ quizProgressId }));

	}

	onEdit(quizProgressId: UUID, editWord: UUID): void {

		this.store.dispatch(closeShowAnswerDialog({ quizProgressId, editWord }));

	}

}
