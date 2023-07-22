import { createSelector } from '@ngrx/store';
import { selectorBookmarkModuleState } from './bookmark.selectors';

const selectorBookmarksState = createSelector(

	selectorBookmarkModuleState,
	state => state.entities

);

export const bookmarks = createSelector(

	selectorBookmarksState,
	state => state.entities

);

export const bookmarksIds = createSelector(

	selectorBookmarksState,
	state => Object.keys(state.entities)

);

export const bookmarksArray = createSelector(

	selectorBookmarksState,
	state => Object.values(state.entities)

);

export const bookmarksCount = createSelector(

	bookmarksIds,
	ids => ids.length

);

export const selectedBookmark = createSelector(

	selectorBookmarksState,
	state => state.selected ? state.entities[state.selected] : null

);

export const bookmarksClicked = createSelector(

	selectorBookmarksState,
	state => state.clicks.filter(c => c.current > 0).length

);