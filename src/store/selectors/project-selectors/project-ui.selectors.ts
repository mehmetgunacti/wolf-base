import { createSelector } from '@ngrx/store';
import { selProject_UIState } from './project.selectors';

export const selProject_infoVisible = createSelector(

	selProject_UIState,
	state => state.infoVisible

);
