import { inject, Injectable } from '@angular/core';
import { NUMBER_OF_CHOICES, Quiz, QuizProgress, UUID, Word } from '@lib';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { selQuiz_definitionIdWordMap, selQuiz_quizProgress } from 'store/selectors/quiz-entry/quiz.selectors';

@Injectable({
	providedIn: 'root'
})
export class QuizService {

	private store: Store = inject(Store);

	quiz$: Observable<Quiz | null>;

	constructor() {

		// select QuizProgress
		const quizProgress$: Observable<QuizProgress | null> = this.store.select(selQuiz_quizProgress);

		// select lookup map
		const definitionIdWordMap$: Observable<Record<UUID, Word>> = this.store.select(selQuiz_definitionIdWordMap);

		this.quiz$ = combineLatest([
			definitionIdWordMap$,
			quizProgress$
		]).pipe(

			map(([map, progress]) => {

				if (!progress)
					return null;

				const question: Word = map[progress.id];
				if (!question)
					return null;

				const choices: Word[] = [];
				const potentialChoices: Word[] = Object.values(map).filter(w => w.definitions[0].type === question.definitions[0].type);

				// choose NUMBER_OF_CHOICES random, unique definitions
				while (choices.length < NUMBER_OF_CHOICES && potentialChoices.length > 0) {

					const randomIdx = Math.floor(Math.random() * potentialChoices.length);
					const randomWord = potentialChoices.splice(randomIdx, 1)[0]; // remove a random word
					choices.push(randomWord);

				}

				const result = [question, ...choices]; // first entry is the question, rest are choices
				return new Quiz(result);

			}),
			shareReplay(1)

		);

	}

}
