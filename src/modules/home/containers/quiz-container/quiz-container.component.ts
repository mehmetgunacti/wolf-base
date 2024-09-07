import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnimState, Quiz, QuizVisibility, quoteChangeTrigger, slideChoicesTrigger, upsideDownTrigger, Word } from '@lib';
import { Store } from '@ngrx/store';
import { QuizService } from 'services/quiz.service';
import * as quizActions from 'store/actions/quiz-entry.actions';
import { selQuiz_visibility } from 'store/selectors/quiz-entry/quiz-entry-ui.selectors';
import { selQuiz_dueItemsCount } from 'store/selectors/quiz-entry/quiz.selectors';
import { choicesBlinkTrigger } from './quiz.animation';

@Component({
	selector: 'app-quiz-container',
	templateUrl: './quiz-container.component.html',
	styleUrls: ['./quiz-container.component.scss'],
	animations: [choicesBlinkTrigger, slideChoicesTrigger, quoteChangeTrigger, upsideDownTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizContainerComponent {

	QuizVisibility = QuizVisibility;

	private store: Store = inject(Store);
	private quizService: QuizService = inject(QuizService);

	quiz: Signal<Quiz | null>;
	visibility: Signal<QuizVisibility>;
	btnTitle: Signal<string>;
	dueItemsCount: Signal<number>;
	animationState: WritableSignal<AnimState>;

	constructor() {

		this.quiz = toSignal(this.quizService.quiz$, { initialValue: null });
		this.dueItemsCount = this.store.selectSignal(selQuiz_dueItemsCount);
		this.visibility = this.store.selectSignal(selQuiz_visibility);
		this.btnTitle = computed(() => {

			const current: QuizVisibility = this.visibility();
			switch (current) {

				case QuizVisibility.HEADER: return 'Show Hints';
				case QuizVisibility.HINTS: return 'Show Choices';
				default: return 'Hide All';

			}

		});
		this.animationState = signal<AnimState>(AnimState.inactive);

	}

	// start blink animation
	onChoiceClick(quiz: Quiz, index: number): void {

		// set correct and incorrect indexes
		quiz.onAnswer(index);
		this.animationState.set(AnimState.active);

	}

	// called after blink animation completes
	complete(event: AnimationEvent, quiz: Quiz): void {

		this.animationState.set(AnimState.inactive);
		const animEnded =
			event.phaseName === 'done' &&
			event.fromState === AnimState.active &&
			event.toState === AnimState.inactive;
		if (animEnded) {

			if (quiz.incorrectChoice() === null) // choice was correct
				this.store.dispatch(quizActions.answeredRight({ quizEntryId: quiz.definition.id }));

			else // choice was incorrect
				this.store.dispatch(quizActions.answeredWrong({ word: quiz.word }));

		}

	}

	showAnswer(word: Word): void {

		this.store.dispatch(quizActions.answeredWrong({ word }));

	}

	increaseVisibility(): void {

		this.store.dispatch(quizActions.increaseVisibility());

	}

}
