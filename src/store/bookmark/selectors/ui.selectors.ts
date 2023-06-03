import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BookmarkModuleState } from '../states';
import { bookmarksCount } from './entities.selector';
import { filteredBookmarkCount } from './tags.selectors';

const selectorModuleState = createFeatureSelector<BookmarkModuleState>('bookmark');

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