import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStates from '../states';
import { BookmarksModuleState } from 'modules/bookmark/bookmark.config';

const selectorModuleState = createFeatureSelector<BookmarksModuleState>('bookmarksModule');
const selectorBookmarksState = createSelector(
	selectorModuleState,
	state => state.bookmarks
);

const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = fromStates.bookmarksAdapter.getSelectors(selectorBookmarksState);

export const selectorBookmarksIds = selectIds;

export const selectorBookmarks = selectEntities;

export const selectorBookmarksArray = selectAll;

export const selectorBookmarksCount = selectTotal;

export const selectorEditDialogVisible = createSelector(
	selectorBookmarksState,
	state => state.editDialogVisible
);

export const selectorSelectedBookmark = createSelector(
	selectorBookmarksState,
	selectorBookmarks,
	(state, dictionary) => state.selected ? dictionary[state.selected] : null
);