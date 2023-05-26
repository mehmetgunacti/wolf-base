import { createSelector } from '@ngrx/store';
import * as fromStates from '../states';
import { selectorModuleState } from './module.selector';

const selectorBookmarksState = createSelector(

	selectorModuleState,
	state => state.entities

);

const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = fromStates.entitiesAdapter.getSelectors(selectorBookmarksState);

export const bookmarksIds = selectIds;

export const bookmarks = selectEntities;

export const bookmarksArray = selectAll;

export const bookmarksCount = selectTotal;

export const isEditDialogVisible = createSelector(

	selectorBookmarksState,
	state => state.editDialogVisible

);

export const selectedBookmark = createSelector(

	selectorBookmarksState,
	bookmarks,
	(state, dictionary) => state.selected ? dictionary[state.selected] : null

);