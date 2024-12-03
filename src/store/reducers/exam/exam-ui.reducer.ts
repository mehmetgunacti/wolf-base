import { examActions } from '@actions/exam.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { exam_initialUIState, Exam_UIState } from '@states/exam.state';

const reducer = createReducer(

	exam_initialUIState,
	on(examActions.openFormDialog, (state): Exam_UIState => ({ ...state, editId: null, formVisible: true })),
	on(examActions.openEditDialog, (state, { id }): Exam_UIState => ({ ...state, editId: id, formVisible: true })),
	on(examActions.closeDialog, (state): Exam_UIState => ({ ...state, editId: null, formVisible: false })),
	on(examActions.editSuccess, (state): Exam_UIState => ({ ...state, editId: null, formVisible: false })),

);

export function exam_UIReducer(state: Exam_UIState | undefined, action: Action): Exam_UIState {
	return reducer(state, action);
}
