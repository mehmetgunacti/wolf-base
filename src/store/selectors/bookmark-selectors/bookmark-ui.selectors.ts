import { createSelector } from '@ngrx/store';
import { selBookmark_EntityCount, selBookmark_EntityMap } from '../entity-selectors/entity-bookmark.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { selBookmark_UIState } from './bookmark.selectors';

export const selBookmarkMenuBadge = createSelector(

	selBookmark_EntityCount,
	filteredBookmarkCount,
	(total, filtered): [number, number] => ([total, filtered])

);

export const selBookmarkShaking = createSelector(

	selBookmark_UIState,
	state => state.shaking

);

export const selBookmarkEditId = createSelector(

	selBookmark_EntityMap,
	selBookmark_UIState,
	(entities, uiState) => uiState.editId ? entities[uiState.editId] : null

);
