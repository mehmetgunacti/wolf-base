import { Action, createReducer, on } from '@ngrx/store';
import { incVisibility, QuizVisibility } from '@constants';
import { quizEntryActions } from '@actions';
import { quizEntry_initialUIState, QuizEntry_UIState } from '@states';

const reducer = createReducer(

	quizEntry_initialUIState,
	on(quizEntryActions.answeredWrong, (state, { word }): QuizEntry_UIState => ({

		...state,
		answer: word,
		visibility: QuizVisibility.HEADER

	})),
	on(quizEntryActions.closeAnswerDialog, (state): QuizEntry_UIState => ({

		...state,
		answer: null,
		visibility: QuizVisibility.HEADER

	})),
	on(quizEntryActions.increaseVisibility, (state): QuizEntry_UIState => ({

		...state,
		visibility: incVisibility(state.visibility)

	})),
	on(quizEntryActions.answeredRight, (state): QuizEntry_UIState => ({

		...state,
		answer: null,
		visibility: QuizVisibility.HEADER

	})),

);

export function quizEntry_UIReducer(state: QuizEntry_UIState | undefined, action: Action): QuizEntry_UIState {
	return reducer(state, action);
}
