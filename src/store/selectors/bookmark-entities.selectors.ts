import { createSelector } from '@ngrx/store';
import { selectorBookmarkModuleState } from './bookmark.selectors';

const selectorBookmarksState = createSelector(

	selectorBookmarkModuleState,
	state => state.entities

);

export const bookmarks = createSelector(

	selectorBookmarksState,
	entities => entities.entities

);

export const bookmarksIds = createSelector(

	selectorBookmarksState,
	state => Object.keys(state.entities)

);

export const bookmarksArray = createSelector(

	selectorBookmarksState,
	state => Object.values(state.entities).map(b => ({ ...b, clicks: state.clicks[b.id].total ?? 0 }))

);

export const bookmarksCount = createSelector(

	bookmarksIds,
	ids => ids.length

);

export const selectedBookmark = createSelector(

	selectorBookmarksState,
	state => state.selected ? state.entities[state.selected] : null

);

const bookmarkClicked = createSelector(

	selectorBookmarksState,
	state => Object.values(state.clicks).filter(c => c.current > 0)

);

export const bookmarkClickedCount = createSelector(

	bookmarkClicked,
	list => list.length

);