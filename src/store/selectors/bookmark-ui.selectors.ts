import { createSelector } from '@ngrx/store';
import { sltBookmarksCount } from './bookmark-entities.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { sltBookmarkUIState } from './bookmark.selectors';

export const sltTagCloudVisibility = createSelector(

	sltBookmarkUIState,
	state => state.tagCloudVisible

);

export const menuBookmarkBadge = createSelector(

	sltBookmarksCount,
	filteredBookmarkCount,
	(total, filtered): [number, number] => ([total, filtered])

);

export const isEditDialogVisible = createSelector(

	sltBookmarkUIState,
	state => state.editDialogVisible

);