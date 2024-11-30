import { TestSuite } from '@models/test-suite.model';
import { createSelector } from '@ngrx/store';
import { selTestSuite_EntityMap } from '../entity/entity-test-suite.selectors';
import { selTestSuite_UIState } from './test-suite.selectors';

// SELECTED ID
const selTestSuite_SelectedId = createSelector(

	selTestSuite_UIState,
	state => state.selectedId

);

export const selTestSuite_selected = createSelector(

	selTestSuite_EntityMap,
	selTestSuite_SelectedId,
	(state, id): TestSuite | null => id ? state[ id ] ?? null : null

);
