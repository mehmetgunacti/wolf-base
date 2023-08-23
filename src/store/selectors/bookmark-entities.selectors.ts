import { createSelector } from '@ngrx/store';
import { selectorBookmarkEntitiesState } from './bookmark.selectors';

export const bookmarks = createSelector(

	selectorBookmarkEntitiesState,
	entities => entities.entities

);

export const selectorBookmarksIds = createSelector(

	selectorBookmarkEntitiesState,
	state => Object.keys(state.entities)

);

export const selectorBookmarksArray = createSelector(

	selectorBookmarkEntitiesState,
	state => Object.values(state.entities).map(b => ({ ...b, clicks: state.clicks[b.id]?.total ?? 0 }))

);

export const selectorBookmarksCount = createSelector(

	selectorBookmarksIds,
	ids => ids.length

);

export const selectedBookmark = createSelector(

	selectorBookmarkEntitiesState,
	state => state.selected ? state.entities[state.selected] : null

);

export const selectorBookmarkClicked = createSelector(

	selectorBookmarkEntitiesState,
	state => Object.values(state.clicks).filter(c => c.current > 0)

);

export const selectorBookmarkClickedCount = createSelector(

	selectorBookmarkClicked,
	list => list.length

);