import { createSelector } from '@ngrx/store';
import { selBookmarksCount } from './bookmark-entities.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { selBookmarkUIState } from './bookmark.selectors';

export const selBookmarkMenuBadge = createSelector(

	selBookmarksCount,
	filteredBookmarkCount,
	(total, filtered): [number, number] => ([total, filtered])

);

export const selBookmarkOverlayId = createSelector(

	selBookmarkUIState,
	state => state.editDialogOverlayId

);

export const selBookmarkShaking = createSelector(

	selBookmarkUIState,
	state => state.shaking

);
