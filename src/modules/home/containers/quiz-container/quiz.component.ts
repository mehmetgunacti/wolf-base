import { ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { lazyFadeIn, Quiz, quoteChangeTrigger, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { take, tap, timer } from 'rxjs';
import { QuizService } from 'services/quiz.service';
import { update } from 'store/actions/quiz-entry.actions';
import { quizChoicesTrigger } from './quiz-choices.animation';

@Component({
	selector: 'app-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss'],
	animations: [quoteChangeTrigger, lazyFadeIn, quizChoicesTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent {

	private store: Store = inject(Store);
	private quizService: QuizService = inject(QuizService);

	protected SHOW_ANSWER = 'show_answer';

	quiz: Signal<Quiz | null>;
	showAnswer = signal(false);
	showIDontKnow = signal(false);
	blinkSuccess: WritableSignal<UUID | null> = signal(null);
	blinkFailure: WritableSignal<UUID | null> = signal(null);

	constructor() {

		this.quiz = toSignal(this.quizService.quiz$, { initialValue: null });

	}

	checkAnswer(quiz: Quiz, choiceId: UUID): void {

		if (quiz.onRightAnswer(choiceId)) { // blink green, dispatch action

			timer(0, 200).pipe(
				take(6),
				tap(counter => this.blinkSuccess.set(counter % 2 === 0 ? choiceId : null))
			).subscribe({
				complete: () => this.store.dispatch(update({ id: quiz.words[0].definitions[0].id, answeredRight: true }))
			});

		} else {

			if (choiceId === this.SHOW_ANSWER) // show answer button pressed
				this.showAnswer.set(true);
			else
				timer(0, 200).pipe( // blink red, show answer

					take(7),
					tap(counter => this.blinkFailure.set(counter % 2 === 0 ? choiceId : null))

				).subscribe({
					complete: () => this.showAnswer.set(true)
				});

		}

	}

	next(quiz: Quiz): void {

		timer(0, 1100).pipe(

			take(2),
			tap(() => this.showAnswer.set(false))

		).subscribe({
			complete: () => this.store.dispatch(update({ id: quiz.words[0].definitions[0].id, answeredRight: false }))
		});

	}

}
