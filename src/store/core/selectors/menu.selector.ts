import { createSelector } from '@ngrx/store';
import { CoreModuleState, MenuState } from '../states';
import { coreModuleState } from './module.selector';

export const menuState = createSelector(

	coreModuleState,
	(state: CoreModuleState): MenuState => state.menu

);

export const totalBookmarksCount = createSelector(

	menuState,
	(state: MenuState) => state.totalBookmarksCount

);

export const selectedBookmarksCount = createSelector(

	menuState,
	(state: MenuState) => state.selectedBookmarksCount

);
