import { createSelector } from '@ngrx/store';
import { selEntityCount, selEntityMap } from './bookmark-entity.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { selBookmark_UIState } from './bookmark.selectors';

export const selBookmarkMenuBadge = createSelector(

	selEntityCount,
	filteredBookmarkCount,
	(total, filtered): [number, number] => ([total, filtered])

);

export const selBookmarkShaking = createSelector(

	selBookmark_UIState,
	state => state.shaking

);

export const selBookmarkEditId = createSelector(

	selEntityMap,
	selBookmark_UIState,
	(entities, uiState) => uiState.editId ? entities[uiState.editId] : null

);
