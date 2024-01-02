import { createSelector } from '@ngrx/store';
import { selBM_count } from './bookmark-entities.selectors';
import { filteredBookmarkCount } from './bookmark-tags.selectors';
import { selBookmarkEntitiesState, selBookmarkUIState } from './bookmark.selectors';

export const selBookmarkMenuBadge = createSelector(

	selBM_count,
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

export const selBookmarkEditId = createSelector(

	selBookmarkEntitiesState,
	selBookmarkUIState,
	(entitiesState, uiState) => uiState.editId ? entitiesState.entities[uiState.editId] : null

);
