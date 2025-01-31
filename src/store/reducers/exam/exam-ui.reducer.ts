import { examActions } from '@actions/exam.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { exam_initialUIState, Exam_UIState } from '@states/exam.state';

const reducer = createReducer(

	exam_initialUIState,
	on(examActions.openFormDialog, (state): Exam_UIState => ({ ...state, editId: null })),
	on(examActions.openEditDialog, (state, { id }): Exam_UIState => ({ ...state, editId: id })),
	on(examActions.editSuccess, (state): Exam_UIState => ({ ...state, editId: null })),
	on(examActions.closeEditDialog, (state): Exam_UIState => ({ ...state, editId: null })),

	on(examActions.openDetailsDialog, (state, { id }): Exam_UIState => ({ ...state, detailsId: id, detailsVisible: true })),
	on(examActions.closeDetailsDialog, (state): Exam_UIState => ({ ...state, detailsId: null, detailsVisible: false })),
	on(examActions.closeDetailsDialog, (state): Exam_UIState => ({ ...state, detailsId: null, detailsVisible: false })),

);

export function exam_UIReducer(state: Exam_UIState | undefined, action: Action): Exam_UIState {
	return reducer(state, action);
}
