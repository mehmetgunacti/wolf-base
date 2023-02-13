import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStates from '../states';
import { BookmarksModuleState } from 'modules/bookmark/bookmark.config';

const selectorModuleState = createFeatureSelector<BookmarksModuleState>('bookmarksModule');
const selectorTagsState = createSelector(
	selectorModuleState,
	state => state.tags
)

const {
	selectIds,
	selectEntities,
	selectAll,
	selectTotal,
} = fromStates.tagsAdapter.getSelectors(selectorTagsState);

export const selectorTagsIds = selectIds;

export const selectorTags = selectEntities;

export const selectorTagsArray = selectAll;

export const selectorTagsCount = selectTotal;

export const selectorTagCloudVisibility = createSelector(
	selectorTagsState,
	state => state.tagCloudVisible
);

export const selectorTagsSelected = createSelector(
	selectorTagsState,
	state => state.selected
);
