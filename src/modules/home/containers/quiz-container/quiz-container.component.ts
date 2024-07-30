import { AnimationEvent } from '@angular/animations';
import { ChangeDetectionStrategy, Component, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AnimState, Quiz, quoteChangeTrigger, slideChoicesTrigger, Word } from '@lib';
import { Store } from '@ngrx/store';
import { QuizService } from 'services/quiz.service';
import { openShowAnswerDialog, revealChoices, update } from 'store/actions/quiz-entry.actions';
import { selQuiz_choicesVisible } from 'store/selectors/quiz-entry-selectors/quiz-entry-ui.selectors';
import { selQuiz_dueItemsCount } from 'store/selectors/quiz-entry-selectors/quiz.selectors';
import { choicesBlinkTrigger } from './quiz.animation';

@Component({
	selector: 'app-quiz-container',
	templateUrl: './quiz-container.component.html',
	styleUrls: ['./quiz-container.component.scss'],
	animations: [choicesBlinkTrigger, slideChoicesTrigger, quoteChangeTrigger],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizContainerComponent {

	private store: Store = inject(Store);
	private quizService: QuizService = inject(QuizService);

	quiz: Signal<Quiz | null>;
	dueItemsCount: Signal<number>;
	choicesVisible: Signal<boolean>;
	animationState: WritableSignal<AnimState>;

	constructor() {

		this.quiz = toSignal(this.quizService.quiz$, { initialValue: null });
		this.dueItemsCount = this.store.selectSignal(selQuiz_dueItemsCount);
		this.choicesVisible = this.store.selectSignal(selQuiz_choicesVisible);
		this.animationState = signal<AnimState>(AnimState.inactive);

	}

	onChoiceClick(quiz: Quiz, index: number): void {

		quiz.onClick(index);
		this.animationState.set(AnimState.active);

	}

	complete(event: AnimationEvent, quiz: Quiz): void {

		this.animationState.set(AnimState.inactive);

		if (event.phaseName === 'done' && event.fromState === AnimState.active && event.toState === AnimState.inactive) {

			if (quiz.incorrectChoice() === null) // choice was correct
				this.store.dispatch(update({ id: quiz.words[0].definitions[0].id, answeredRight: true }));

			else // choice was incorrect
				this.store.dispatch(openShowAnswerDialog({ word: quiz.words[0] }));

		}

	}

	showAnswer(word: Word): void {

		this.store.dispatch(openShowAnswerDialog({ word }));

	}

	showChoices(): void {

		this.store.dispatch(revealChoices());

	}

}
