import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksModuleState } from 'modules/bookmark/bookmark.config';

const selectorModuleState = createFeatureSelector<BookmarksModuleState>('bookmarksModule');

const selectorUIState = createSelector(
	selectorModuleState,
	state => state.ui
)

export const selectorTagCloudVisibility = createSelector(
	selectorUIState,
	state => state.tagCloudVisible
);
