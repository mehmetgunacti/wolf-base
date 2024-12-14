import { computed, InjectionToken, Signal } from '@angular/core';
import { UUID } from '@constants/common.constant';
import { ISODateString } from '@models/id-base.model';
import { Answer, Exam, Question, Session } from '@models/test-suite.model';
import { patchState, SignalState, signalState } from '@ngrx/signals';
import { v4 as uuidv4 } from 'uuid';

interface SessionState {

	idx: number;
	answers: Record<UUID, Answer>;
	started: ISODateString;
	updated: ISODateString;

}

export interface SessionStore {

	numberOfQuestions: Signal<number>;
	hasPrev: Signal<boolean>;
	index: Signal<number>;
	currentQuestion: Signal<Question | null>;
	currentAnswer: Signal<Answer | null>;
	status: Signal<'new' | 'finished' | 'ongoing'>;
	result: Session;

	start(exam: Exam): void;
	next(questionId: string, value: boolean[]): void;
	prev(questionId: string, value: boolean[]): void;

}

export class SessionStoreImpl implements SessionStore {

	private exam: Exam | null = null;

	private state: SignalState<SessionState> = signalState<SessionState>({

		idx: -1,
		answers: {},
		started: new Date().toISOString(),
		updated: new Date().toISOString()

	});
	status = computed(() => {

		const index = this.state().idx;
		const exam = this.exam;
		if (exam === null)
			return 'new';
		const numberOfQuestions = exam.questions.length;

		if (index < 0)
			return 'new';

		if (index >= numberOfQuestions)
			return 'finished';

		return 'ongoing';

	});
	currentQuestion = computed(() => {

		const state = this.state();
		const exam = this.exam;
		if (exam)
			return exam.questions[ state.idx ];
		return null;

	});
	currentAnswer = computed(() => {

		const q = this.currentQuestion();
		if (q)
			return this.state().answers[ q.id ];
		return null;

	});
	index = computed(() => this.state().idx); // computed() as getter..
	numberOfQuestions = computed(() => this.exam?.questions.length ?? 0);
	hasPrev = computed(() => this.state().idx > 0);

	start(exam: Exam): void {

		this.exam = exam;
		patchState(
			this.state,
			(state) => ({

				idx: state.idx + 1,
				started: new Date().toISOString(),
				updated: new Date().toISOString(),
				answers: exam.questions.reduce(

					(acc, q) => {
						acc[ q.id ] = {
							id: q.id,
							choices: new Array(q.answers.length).fill(false),
							time: 0
						};
						return acc;
					},
					{} as Record<UUID, Answer>

				)

			})
		);

	}

	next(questionId: UUID, choices: boolean[]): void {

		const now = Date.now();
		patchState(
			this.state,
			(state) => ({

				answers: {
					...state.answers,
					[ questionId ]: { id: questionId, choices, time: now - new Date(state.updated).getTime() }
				},
				idx: state.idx + 1,
				updated: new Date().toISOString()

			})
		);

	};

	prev(questionId: UUID, choices: boolean[]): void {

		if (this.hasPrev()) {

			const now = Date.now();
			patchState(
				this.state,
				(state) => ({

					answers: {
						...state.answers,
						[ questionId ]: { id: questionId, choices, time: now - new Date(state.updated).getTime() }
					},
					idx: state.idx - 1,
					updated: new Date().toISOString()

				})
			);

		}

	};

	get result(): Session {

		const exam = this.exam;
		if (exam) {

			const session: Session = {

				id: uuidv4(),
				name: exam.name,
				exam: { id: exam.id, name: exam.name },
				answers: this.state.answers(),
				start: this.state.started(),
				end: this.state.updated()

			};
			return session;

		}
		throw new Error('Unreachable code reached');

	}

};

export const SESSION_STORE = new InjectionToken<SessionStoreImpl>('SESSION_STORE');
