import { UUID } from '@constants/common.constant';

export interface Exam_ModuleState {

	ui: Exam_UIState;

}

export interface Exam_UIState {

	selectedId: UUID | null;

}

// INITIALIZATION

export const exam_initialUIState: Exam_UIState = {

	selectedId: null

};

export const exam_initialState: Exam_ModuleState = {

	ui: exam_initialUIState

};
