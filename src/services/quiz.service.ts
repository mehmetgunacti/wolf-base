import { inject, Injectable } from '@angular/core';
import { NUMBER_OF_CHOICES, Quiz, QuizProgress, UUID, Word } from '@lib';
import { Store } from '@ngrx/store';
import { produce } from "immer";
import { combineLatest, Observable, timer } from 'rxjs';
import { distinctUntilChanged, map, shareReplay } from 'rxjs/operators';
import { selQuizEntry_array } from 'store/selectors/quiz-entry-selectors/quiz-entry-entities.selectors';
import { selWord_array } from 'store/selectors/word-selectors/word-entities.selectors';

function sortArr(arr: QuizProgress[]): QuizProgress[] {

	return arr.sort((a, b) => {

		if (a.next === b.next)
			return a.name.localeCompare(b.name);
		return a.next - b.next;

	});

};

function toMap(words: Word[]): Record<UUID, Word> {

	const map: Record<UUID, Word> = {};
	words.forEach(w => {

		w.definitions.forEach(d => {

			// need a copy of Word, because 'definitions' array is being modified
			map[d.id] = produce(w, (draft) => { draft.definitions = [d]; });

		});

	});
	return map;

}

@Injectable({
	providedIn: 'root'
})
export class QuizService {

	private store: Store = inject(Store);

	quiz$: Observable<Quiz | null>;

	constructor() {

		const timer$: Observable<number> = timer(Date.now(), 60 * 1000).pipe(map(() => Date.now()));
		const allProgress$: Observable<QuizProgress[]> = this.store.select(selQuizEntry_array).pipe(map(sortArr));
		const quizProgress$: Observable<QuizProgress | null> = combineLatest([
			timer$,
			allProgress$
		]).pipe(

			map(([now, arr]): QuizProgress | null => arr.find(q => q.next < now) ?? null),
			distinctUntilChanged()

		);
		const definitionIdWordMap$: Observable<Record<UUID, Word>> = this.store.select(selWord_array).pipe(

			distinctUntilChanged(),
			map(toMap),

		);
		this.quiz$ = combineLatest([
			definitionIdWordMap$,
			quizProgress$
		]).pipe(

			map(([map, progress]) => {

				if (!progress)
					return null;

				const question = map[progress.id];
				if (!question)
					throw Error('progress.id not found in map');

				const result: Word[] = [question]; // first entry is the question, rest are choices

				const potentialChoices: Word[] = Object.values(map).filter(w => w.definitions[0].type === question.definitions[0].type);
				for (let i = 0; i < NUMBER_OF_CHOICES; ++i) { // choose NUMBER_OF_CHOICES random definitions

					const randomIdx = Math.floor(potentialChoices.length * Math.random());
					result.push(potentialChoices[randomIdx]);

				}
				return new Quiz(result);

			}),
			shareReplay(1)

		);

	}

}
