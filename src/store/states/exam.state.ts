import { UUID } from '@constants/common.constant';

export interface Exam_ModuleState {

	ui: Exam_UIState;

}

export interface Exam_UIState {

	editId: UUID | null;

	detailsVisible: boolean;
	detailsId: UUID | null;

}

// INITIALIZATION

export const exam_initialUIState: Exam_UIState = {

	editId: null,
	detailsVisible: false,
	detailsId: null

};

export const exam_initialState: Exam_ModuleState = {

	ui: exam_initialUIState

};
