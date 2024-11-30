import { UUID } from '@constants/common.constant';

export interface TestSuite_ModuleState {

	ui: TestSuite_UIState;

}

export interface TestSuite_UIState {

	selectedId: UUID | null;

}

// INITIALIZATION

export const initialTestSuiteUIState: TestSuite_UIState = {

	selectedId: null

};

export const initialTestSuiteState: TestSuite_ModuleState = {

	ui: initialTestSuiteUIState

};
