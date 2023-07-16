import { createSelector } from '@ngrx/store';
import { selectorModuleState } from './module.selector';

const selectorBookmarksState = createSelector(

	selectorModuleState,
	state => state.entities

);

export const bookmarksIds = createSelector(

	selectorBookmarksState,
	state => state.entities.keys()

);

export const bookmarksArray = createSelector(

	selectorBookmarksState,
	state => Array.from(state.entities.values())

);

export const bookmarksCount = createSelector(

	selectorBookmarksState,
	state => state.entities.size

);

export const isEditDialogVisible = createSelector(

	selectorBookmarksState,
	state => state.editDialogVisible

);

export const selectedBookmark = createSelector(

	selectorBookmarksState,
	state => state.selected ? state.entities.get(state.selected) : null

);