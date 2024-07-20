import { Action, createReducer, on } from '@ngrx/store';
import { closeShowAnswerDialog, openShowAnswerDialog, revealChoices, update } from 'store/actions/quiz-entry.actions';
import { quizEntry_initialUIState, QuizEntry_UIState } from 'store/states/quiz-entry.state';

const reducer = createReducer(

	quizEntry_initialUIState,
	on(openShowAnswerDialog, (state, { word }): QuizEntry_UIState => ({ ...state, answer: word, choicesVisible: false })),
	on(closeShowAnswerDialog, (state): QuizEntry_UIState => ({ ...state, answer: null, choicesVisible: false })),
	on(revealChoices, (state): QuizEntry_UIState => ({ ...state, choicesVisible: true })),
	on(update, (state): QuizEntry_UIState => ({ ...state, choicesVisible: false })),

);

export function quizEntry_UIReducer(state: QuizEntry_UIState | undefined, action: Action): QuizEntry_UIState {
	return reducer(state, action);
}
