import { createSelector } from '@ngrx/store';
import { selBookmark_count, selBookmark_entities } from './bookmark-entities.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { selBookmark_UIState } from './bookmark.selectors';

export const selBookmarkMenuBadge = createSelector(

	selBookmark_count,
	filteredBookmarkCount,
	(total, filtered): [number, number] => ([total, filtered])

);

export const selBookmarkShaking = createSelector(

	selBookmark_UIState,
	state => state.shaking

);

export const selBookmarkEditId = createSelector(

	selBookmark_entities,
	selBookmark_UIState,
	(entities, uiState) => uiState.editId ? entities[uiState.editId] : null

);
