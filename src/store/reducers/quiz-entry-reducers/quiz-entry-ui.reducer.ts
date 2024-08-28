import { incVisibility, QuizVisibility } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { closeShowAnswerDialog, increaseVisibility, openShowAnswerDialog } from 'store/actions/quiz-entry.actions';
import { quizEntry_initialUIState, QuizEntry_UIState } from 'store/states/quiz-entry.state';

const reducer = createReducer(

	quizEntry_initialUIState,
	on(openShowAnswerDialog, (state, { word }): QuizEntry_UIState => ({ ...state, answer: word, visibility: QuizVisibility.HEADER })),
	on(closeShowAnswerDialog, (state): QuizEntry_UIState => ({ ...state, answer: null, visibility: QuizVisibility.HEADER })),
	on(increaseVisibility, (state): QuizEntry_UIState => ({ ...state, visibility: incVisibility(state.visibility) })),
	// on(update, (state): QuizEntry_UIState => ({ ...state, visibility: QuizVisibility.HEADER })),

);

export function quizEntry_UIReducer(state: QuizEntry_UIState | undefined, action: Action): QuizEntry_UIState {
	return reducer(state, action);
}
