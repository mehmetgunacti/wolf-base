import { Action, createReducer, on } from '@ngrx/store';
import { closeShowAnswerDialog, openShowAnswerDialog } from 'store/actions/quiz-entry.actions';
import { quizEntry_initialUIState, QuizEntry_UIState } from 'store/states/quiz-entry.state';

const reducer = createReducer(

	quizEntry_initialUIState,
	on(openShowAnswerDialog, (state, { word }): QuizEntry_UIState => ({ ...state, answer: word })),
	on(closeShowAnswerDialog, (state): QuizEntry_UIState => ({ ...state, answer: null })),

);

export function quizEntry_UIReducer(state: QuizEntry_UIState | undefined, action: Action): QuizEntry_UIState {
	return reducer(state, action);
}
