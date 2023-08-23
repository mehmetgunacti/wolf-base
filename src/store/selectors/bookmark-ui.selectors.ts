import { createSelector } from '@ngrx/store';
import { selectorBookmarksCount } from './bookmark-entities.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { selectorBookmarkUIState } from './bookmark.selectors';

export const selectorTagCloudVisibility = createSelector(

	selectorBookmarkUIState,
	state => state.tagCloudVisible

);

export const menuBookmarkBadge = createSelector(

	selectorBookmarksCount,
	filteredBookmarkCount,
	(total, filtered): [number, number] => ([total, filtered])

);

export const isEditDialogVisible = createSelector(

	selectorBookmarkUIState,
	state => state.editDialogVisible

);