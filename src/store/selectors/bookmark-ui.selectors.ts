import { createSelector } from '@ngrx/store';
import { selBookmarksCount } from './bookmark-entities.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { selBookmarkUIState } from './bookmark.selectors';

export const selTagCloudVisibility = createSelector(

	selBookmarkUIState,
	state => state.tagCloudVisible

);

export const menuBookmarkBadge = createSelector(

	selBookmarksCount,
	filteredBookmarkCount,
	(total, filtered): [number, number] => ([total, filtered])

);

export const isEditDialogVisible = createSelector(

	selBookmarkUIState,
	state => state.editDialogVisible

);