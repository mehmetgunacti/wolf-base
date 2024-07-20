import { ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Quiz, quoteChangeTrigger, slideDown, UUID, Word } from '@lib';
import { Store } from '@ngrx/store';
import { take, tap, timer } from 'rxjs';
import { QuizService } from 'services/quiz.service';
import { openShowAnswerDialog, revealChoices, update } from 'store/actions/quiz-entry.actions';
import { selQuiz_choicesVisible } from 'store/selectors/quiz-entry-selectors/quiz-entry-ui.selectors';

@Component({
	selector: 'app-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss'],
	animations: [quoteChangeTrigger, slideDown],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent {

	private store: Store = inject(Store);
	private quizService: QuizService = inject(QuizService);

	quiz: Signal<Quiz | null>;
	choicesVisible: Signal<boolean>;
	blinkSuccess: WritableSignal<UUID | null> = signal(null);
	blinkFailure: WritableSignal<UUID | null> = signal(null);

	constructor() {

		this.quiz = toSignal(this.quizService.quiz$, { initialValue: null });
		this.choicesVisible = this.store.selectSignal(selQuiz_choicesVisible);

	}

	checkAnswer(quiz: Quiz, choiceId: UUID): void {

		if (quiz.onRightAnswer(choiceId)) { // blink green, dispatch action

			timer(0, 200).pipe(
				take(6),
				tap(counter => this.blinkSuccess.set(counter % 2 === 0 ? choiceId : null))
			).subscribe({
				complete: () => {

					this.store.dispatch(update({ id: quiz.words[0].definitions[0].id, answeredRight: true }));

				}
			})

		} else {

			timer(0, 200).pipe( // blink red, show answer

				take(7),
				tap(counter => this.blinkFailure.set(counter % 2 === 0 ? choiceId : null))

			).subscribe({
				complete: () => {

					this.store.dispatch(openShowAnswerDialog({ word: quiz.words[0] }));

				}
			});

		}

	}

	showAnswer(word: Word): void {

		this.store.dispatch(openShowAnswerDialog({ word }));

	}

	showChoices(): void {

		this.store.dispatch(revealChoices());

	}

}
