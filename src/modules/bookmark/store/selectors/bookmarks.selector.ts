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

export const selectorBookmarksSyncRequired = createSelector(
	selectorBookmarksState,
	state => state.syncRequired
);

export const selectorBookmarksSyncStatus = createSelector(
	selectorBookmarksState,
	state => state.syncStatus
);

export const selectorSyncBookmarksForceOverride = createSelector(
	selectorBookmarksState,
	state => state.syncForceOverride
);

export const selectorSyncBookmarksMessages = createSelector(
	selectorBookmarksState,
	state => state.syncMessages
);

export const selectorEditDialogVisible = createSelector(
	selectorBookmarksState,
	state => state.editDialogVisible
);

export const selectorSelectedBookmark = createSelector(
	selectorBookmarksState,
	selectorBookmarks,
	(state, dictionary) => state.selected ? dictionary[state.selected] : null
);