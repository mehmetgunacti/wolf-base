import { createSelector } from '@ngrx/store';
import { sltBookmarkEntitiesState } from './bookmark.selectors';

export const sltBookmarks = createSelector(

	sltBookmarkEntitiesState,
	entities => entities.entities

);

export const sltBookmarksIds = createSelector(

	sltBookmarkEntitiesState,
	state => Object.keys(state.entities)

);

export const sltBookmarksArray = createSelector(

	sltBookmarkEntitiesState,
	state => Object.values(state.entities).map(b => ({ ...b, clicks: state.clicks[b.id]?.total ?? 0 }))

);

export const sltBookmarksCount = createSelector(

	sltBookmarksIds,
	ids => ids.length

);

export const sltBookmark = createSelector(

	sltBookmarkEntitiesState,
	state => state.selected ? state.entities[state.selected] : null

);

export const sltBookmarkClicked = createSelector(

	sltBookmarkEntitiesState,
	state => Object.values(state.clicks).filter(c => c.current > 0)

);

export const sltBookmarkClickedCount = createSelector(

	sltBookmarkClicked,
	list => list.length

);