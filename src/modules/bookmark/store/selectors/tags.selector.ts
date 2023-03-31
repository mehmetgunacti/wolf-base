import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarksModuleState } from 'modules/bookmark/bookmark.config';

const selectorModuleState = createFeatureSelector<BookmarksModuleState>('bookmarksModule');
const selectorTagsState = createSelector(
	selectorModuleState,
	state => state.tags
)

export const selectorTagsArray = createSelector(
	selectorTagsState,
	state => state.tags
);

export const selectorTagCloudVisibility = createSelector(
	selectorTagsState,
	state => state.tagCloudVisible
);

export const selectorTagsSelected = createSelector(
	selectorTagsState,
	state => state.selected // Object.entries(state.selected).filter(([key, value]) => value).map(([key, value]) => key)
);
