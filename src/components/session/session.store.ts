import { computed, Injectable } from '@angular/core';
import { Exam, Question, Session } from '@models/test-suite.model';
import { patchState, SignalState, signalState } from '@ngrx/signals';
import { v4 as uuidv4 } from 'uuid';

interface SessionState {

	idx: number;
	session: Session | null;
	questions: Question[];

}

@Injectable()
export class SessionStore {

	private state: SignalState<SessionState> = signalState<SessionState>({

		idx: -1,
		session: null,
		questions: []

	});

	numberOfQuestions = computed(() => this.state.questions().length);

	status = computed(() => {

		const session = this.state().session;
		const index = this.state().idx;
		const numberOfQuestions = this.state().questions.length;

		if (session === null)
			return 'new';

		if (index >= numberOfQuestions)
			return 'finished';

		if (index > -1)
			return 'ongoing';

		return 'new';

	});

	currentQuestion = computed(() => {

		if (this.status() === 'ongoing')
			return this.state().questions[ this.state().idx ];
		return null;

	});

	hasPrev = computed(() => {

		if (this.status() === 'ongoing')
			return this.state().idx > 0;
		return false;

	});

	index = computed(() => this.state().idx);

	init(exam: Exam): void {

		patchState(
			this.state,
			(state) => ({

				idx: state.idx + 1,
				session: {

					id: uuidv4(),
					name: exam.name,
					exam: {

						id: exam.id,
						name: exam.name

					},
					start: new Date().toISOString(),
					end: null,
					answers: {}

				},
				questions: exam.questions

			})
		);

	}

	next(): void {

		patchState(
			this.state,
			(state) => ({ idx: state.idx + 1 })
		);

	};

	prev(): void {

		if (this.hasPrev())
			patchState(
				this.state,
				(state) => ({ idx: state.idx - 1 })
			);

	};

};
