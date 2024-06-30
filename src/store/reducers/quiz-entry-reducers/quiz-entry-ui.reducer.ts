import { Action, createReducer, on } from '@ngrx/store';
import { moveToTrashSuccess, setSelectedId } from 'store/actions/quiz-entry.actions';
import { createSuccess } from 'store/actions/quiz-entry.actions';
import { QuizEntry_UIState, quizEntry_initialUIState } from 'store/states/quiz-entry.state';

const reducer = createReducer(

	quizEntry_initialUIState,
	on(setSelectedId, (state, { id }): QuizEntry_UIState => ({ ...state, selectedId: id })),
	on(createSuccess, (state, { quizEntry }): QuizEntry_UIState => ({ ...state, selectedId: quizEntry.id })),
	on(moveToTrashSuccess, (state): QuizEntry_UIState => ({ ...state, selectedId: null }))

);

export function quizEntry_UIReducer(state: QuizEntry_UIState | undefined, action: Action): QuizEntry_UIState {
	return reducer(state, action);
}
