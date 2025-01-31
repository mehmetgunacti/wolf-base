import { UUID } from '@constants/common.constant';

export interface TestSuite_ModuleState {

	ui: TestSuite_UIState;

}

export interface TestSuite_UIState {

	selectedId: UUID | null;
	selectedExamId: UUID | null;

}

// INITIALIZATION

export const testSuite_initialUIState: TestSuite_UIState = {

	selectedId: null,
	selectedExamId: null

};

export const testSuite_initialState: TestSuite_ModuleState = {

	ui: testSuite_initialUIState

};
