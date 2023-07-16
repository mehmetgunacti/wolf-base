import { createSelector } from '@ngrx/store';
import { bookmarksArray, bookmarksCount } from './entities.selector';
import { selectorModuleState } from './module.selector';
import { filteredBookmarkCount } from './tags.selectors';

const selectorUIState = createSelector(
	selectorModuleState,
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

export const menuSyncableItemsCount = createSelector(

	bookmarksArray,
	bookmarks => -1

);

export const isEditDialogVisible = createSelector(

	selectorUIState,
	state => state.editDialogVisible

);