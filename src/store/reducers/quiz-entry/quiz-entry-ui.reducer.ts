import { incVisibility, QuizVisibility } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import * as quizActions from 'store/actions/quiz-entry.actions';
import { quizEntry_initialUIState, QuizEntry_UIState } from 'store/states/quiz-entry.state';

const reducer = createReducer(

	quizEntry_initialUIState,
	on(quizActions.answeredWrong, (state, { word }): QuizEntry_UIState => ({

		...state,
		answer: word,
		visibility: QuizVisibility.HEADER

	})),
	on(quizActions.closeAnswerDialog, (state): QuizEntry_UIState => ({

		...state,
		answer: null,
		visibility: QuizVisibility.HEADER

	})),
	on(quizActions.increaseVisibility, (state): QuizEntry_UIState => ({

		...state,
		visibility: incVisibility(state.visibility)

	})),
	on(quizActions.answeredRight, (state): QuizEntry_UIState => ({

		...state,
		answer: null,
		visibility: QuizVisibility.HEADER

	})),

);

export function quizEntry_UIReducer(state: QuizEntry_UIState | undefined, action: Action): QuizEntry_UIState {
	return reducer(state, action);
}
