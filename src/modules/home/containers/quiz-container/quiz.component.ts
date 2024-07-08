import { ChangeDetectionStrategy, Component, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { lazyFadeIn, Quiz, quoteChangeTrigger, UUID } from '@lib';
import { Store } from '@ngrx/store';
import { setNow, update } from 'store/actions/quiz-entry.actions';
import { selQuiz_next } from 'store/selectors/quiz-entry-selectors/quiz.selectors';

@Component({
	selector: 'app-quiz',
	templateUrl: './quiz.component.html',
	styleUrls: ['./quiz.component.scss'],
	animations: [quoteChangeTrigger, lazyFadeIn],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class QuizComponent {

	private store: Store = inject(Store);

	quiz: Signal<Quiz | null>;

	constructor() {

		this.quiz = toSignal(this.store.select(selQuiz_next), { initialValue: null });
		this.store.dispatch(setNow());

	}

	checkAnswer(quiz: Quiz, choiceId: UUID): void {

		if (quiz.onRightAnswer(choiceId))
			this.store.dispatch(update({ id: quiz.words[0].definitions[0].id, answeredRight: true }));

	}

	next(quiz: Quiz): void {

		this.store.dispatch(update({ id: quiz.words[0].definitions[0].id, answeredRight: false }));

	}

}
