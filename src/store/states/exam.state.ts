import { UUID } from '@constants/common.constant';

export interface Exam_ModuleState {

	ui: Exam_UIState;

}

export interface Exam_UIState {

	formVisible: boolean;
	editId: UUID | null;

}

// INITIALIZATION

export const exam_initialUIState: Exam_UIState = {

	formVisible: false,
	editId: null

};

export const exam_initialState: Exam_ModuleState = {

	ui: exam_initialUIState

};
