import { createSelector } from '@ngrx/store';
import { bookmarksCount } from './bookmark-entities.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { selectorBookmarkModuleState } from './bookmark.selectors';

export const selectorUIState = createSelector(

	selectorBookmarkModuleState,
	state => state.ui

)

export const selectorTagCloudVisibility = createSelector(

	selectorUIState,
	state => state.tagCloudVisible

);

export const menuBookmarkBadge = createSelector(

	bookmarksCount,
	filteredBookmarkCount,
	(total, selected) => selected < total ? `${selected}/${total}` : `${total}`

);

export const isEditDialogVisible = createSelector(

	selectorUIState,
	state => state.editDialogVisible

);