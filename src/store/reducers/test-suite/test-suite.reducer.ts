import { ActionReducerMap } from '@ngrx/store';
import { TestSuite_ModuleState } from '@states/test-suite.state';
import { testSuite_UIReducer } from './test-suite-ui.reducer';

export const testSuiteReducer: ActionReducerMap<TestSuite_ModuleState> = {

	ui: testSuite_UIReducer

};
