import { testSuiteActions } from '@actions/test-suite.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { testSuite_initialUIState, TestSuite_UIState } from '@states/test-suite.state';

const reducer = createReducer(

	testSuite_initialUIState,
	on(testSuiteActions.setSelectedId, (state, { id }): TestSuite_UIState => ({ ...state, selectedId: id }))

);

export function testSuite_UIReducer(state: TestSuite_UIState | undefined, action: Action): TestSuite_UIState {
	return reducer(state, action);
}
