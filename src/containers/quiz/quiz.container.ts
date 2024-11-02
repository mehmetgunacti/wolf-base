import { quizEntryActions } from '@actions';
import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { quoteChangeTrigger, slideChoicesTrigger } from '@animations';
import { QuizVisibility } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent } from '@libComponents';
import { AnimState, Quiz, Word } from '@models';
import { Store } from '@ngrx/store';
import { MarkOrHighlightPipe } from '@pipes';
import { selQuiz_dueItemsCount, selQuiz_visibility } from '@selectors';
import { QuizService } from '@services';
import { LanguagesComponent } from 'lib/components/languages.component';
import { choicesBlinkTrigger } from './quiz.animation';

@Component({
	standalone: true,
	imports: [ GlyphDirective, MarkOrHighlightPipe, LanguagesComponent, CommonModule ],
	selector: 'app-quiz-container',
	templateUrl: './quiz.container.html',
	animations: [ choicesBlinkTrigger, slideChoicesTrigger, quoteChangeTrigger ],
	host: { 'class': 'flex flex-col' }
})
export class QuizContainerComponent extends BaseComponent {

	QuizVisibility = QuizVisibility;

	private store: Store = inject(Store);
	private quizService: QuizService = inject(QuizService);

	quiz: Signal<Quiz | null>;
	visibility: Signal<QuizVisibility>;
	btnTitle: Signal<string>;
	dueItemsCount: Signal<number>;
	animationState: WritableSignal<AnimState>;

	constructor() {

		super();
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
				this.store.dispatch(quizEntryActions.answeredRight({ quizEntryId: quiz.definition.id }));

			else // choice was incorrect
				this.store.dispatch(quizEntryActions.answeredWrong({ word: quiz.word }));

		}

	}

	showAnswer(word: Word): void {

		this.store.dispatch(quizEntryActions.answeredWrong({ word }));

	}

	increaseVisibility(): void {

		this.store.dispatch(quizEntryActions.increaseVisibility());

	}

}
