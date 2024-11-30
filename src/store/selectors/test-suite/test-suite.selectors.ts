import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TestSuite_ModuleState } from '@states/test-suite.state';

const selTestSuite_ModuleState = createFeatureSelector<TestSuite_ModuleState>('testSuite');

export const selTestSuite_UIState = createSelector(

	selTestSuite_ModuleState,
	state => state.ui

);
