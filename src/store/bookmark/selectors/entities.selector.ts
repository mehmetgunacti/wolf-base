import { createSelector } from '@ngrx/store';
import { selectorModuleState } from './module.selector';

const selectorBookmarksState = createSelector(

	selectorModuleState,
	state => state.entities

);

export const bookmarks = createSelector(

	selectorBookmarksState,
	state => state.entities

);

export const bookmarksIds = createSelector(

	selectorBookmarksState,
	state => state.entities.keys()

);

export const bookmarksArray = createSelector(

	selectorBookmarksState,
	state => Array.from(state.entities.values())

);

export const bookmarksCount = createSelector(

	selectorBookmarksState,
	state => state.entities.size

);

export const selectedBookmark = createSelector(

	selectorBookmarksState,
	state => state.selected ? state.entities.get(state.selected) : null

);

export const bookmarksClicked = createSelector(

	selectorBookmarksState,
	state => state.clicks.filter(c => c.current > 0).length

);