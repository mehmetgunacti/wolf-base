import { examActions } from '@actions/exam.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { exam_initialUIState, Exam_UIState } from '@states/exam.state';

const reducer = createReducer(

	exam_initialUIState,
	on(examActions.setSelectedId, (state, { id }): Exam_UIState => ({ ...state, selectedId: id }))

);

export function exam_UIReducer(state: Exam_UIState | undefined, action: Action): Exam_UIState {
	return reducer(state, action);
}
