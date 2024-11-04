import { quizEntryActions } from '@actions';
import { AnimationEvent } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal, Signal, WritableSignal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { quoteChangeTrigger, slideChoicesTrigger } from '@animations';
import { LanguagesComponent } from '@components';
import { QuizVisibility, UUID } from '@constants';
import { GlyphDirective } from '@directives';
import { BaseComponent, ModalComponent } from '@libComponents';
import { AnimState, Quiz, Word } from '@models';
import { Store } from '@ngrx/store';
import { MarkOrHighlightPipe } from '@pipes';
import { selQuiz_answer, selQuiz_dueItemsCount, selQuiz_visibility } from '@selectors';
import { QuizService } from '@services';
import { WordComponent } from "../../components/word/word.component";
import { choicesBlinkTrigger } from './quiz.animation';

@Component({
	standalone: true,
	imports: [ GlyphDirective, MarkOrHighlightPipe, LanguagesComponent, CommonModule, ModalComponent, WordComponent ],
	selector: 'app-quiz-container',
	templateUrl: './quiz.container.html',
	animations: [ choicesBlinkTrigger, slideChoicesTrigger, quoteChangeTrigger ],
	host: { 'class': 'flex flex-col' }
})
export class QuizContainerComponent extends BaseComponent {

	QuizVisibility = QuizVisibility;

	private store: Store = inject(Store);
	private quizService: QuizService = inject(QuizService);

	protected quiz: Signal<Quiz | null>;
	protected visibility: Signal<QuizVisibility>;
	protected btnTitle: Signal<string>;
	protected dueItemsCount: Signal<number>;
	protected animationState: WritableSignal<AnimState>;
	protected answer: Signal<Word | null>;

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
		this.answer = this.store.selectSignal(selQuiz_answer);

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

		this.store.dispatch(quizEntryActions.expand());

	}

	onEdit(wordId: UUID): void {

		this.store.dispatch(quizEntryActions.editWord({ wordId }));

	}

	onCloseAnswer(): void {

		this.store.dispatch(quizEntryActions.hideAnswer());

	}

}
