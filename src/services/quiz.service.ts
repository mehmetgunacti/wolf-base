import { inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { NUMBER_OF_CHOICES, UUID } from '@constants';
import { Quiz, QuizEntry, Word } from '@models';
import { combineLatest, Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { selQuiz_definitionIdWordMap, selQuiz_quizEntry } from '@selectors';

@Injectable({
	providedIn: 'root'
})
export class QuizService {

	private store: Store = inject(Store);

	quiz$: Observable<Quiz | null>;

	constructor() {

		// select QuizEntry
		const quizEntry$: Observable<QuizEntry | null> = this.store.select(selQuiz_quizEntry);

		// select lookup map
		const definitionIdWordMap$: Observable<Record<UUID, Word>> = this.store.select(selQuiz_definitionIdWordMap);

		this.quiz$ = combineLatest([
			definitionIdWordMap$,
			quizEntry$
		]).pipe(

			map(([ map, quizEntry ]) => {

				if (!quizEntry)
					return null;

				const question: Word = map[ quizEntry.id ];
				if (!question)
					return null;

				const choices: Word[] = [];
				const potentialChoices: Word[] = Object.values(map)
					.filter(w => w.definitions[ 0 ].type === question.definitions[ 0 ].type) // remove by type
					.filter(w => w.definitions[ 0 ].id !== quizEntry.id); // remove current question

				// choose NUMBER_OF_CHOICES random, unique definitions
				while (choices.length < NUMBER_OF_CHOICES && potentialChoices.length > 0) {

					const randomIdx = Math.floor(Math.random() * potentialChoices.length);
					const randomWord = potentialChoices.splice(randomIdx, 1)[ 0 ]; // remove a random word
					choices.push(randomWord);

				}

				const result = [ question, ...choices ]; // first entry is the question, rest are choices
				return new Quiz(result, quizEntry.question === 'term');

			}),
			shareReplay(1)

		);

	}

}
