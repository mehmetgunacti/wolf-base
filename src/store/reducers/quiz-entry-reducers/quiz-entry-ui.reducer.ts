import { Action, createReducer, on } from '@ngrx/store';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';
import { quizEntry_initialUIState, QuizEntry_UIState } from 'store/states/quiz-entry.state';

const reducer = createReducer(

	quizEntry_initialUIState,
	on(quizEntryActions.setNow, (state): QuizEntry_UIState => ({ ...state, now: new Date().getTime() }))

);

export function quizEntry_UIReducer(state: QuizEntry_UIState | undefined, action: Action): QuizEntry_UIState {
	return reducer(state, action);
}
