import { createSelector } from '@ngrx/store';
import { selBookmarkEntitiesState } from './bookmark.selectors';

export const selBookmarks = createSelector(

	selBookmarkEntitiesState,
	entities => entities.entities

);

export const selBookmarkIds = createSelector(

	selBookmarkEntitiesState,
	state => Object.keys(state.entities)

);

export const selBookmarkArray = createSelector(

	selBookmarkEntitiesState,
	state => Object.values(state.entities).map(b => ({ ...b, clicks: state.clicks[b.id]?.total ?? 0 }))

);

export const selBookmarksCount = createSelector(

	selBookmarkIds,
	ids => ids.length

);

export const selBookmark = createSelector(

	selBookmarkEntitiesState,
	state => state.selected ? state.entities[state.selected] : null

);

export const selBookmarkClicked = createSelector(

	selBookmarkEntitiesState,
	state => Object.values(state.clicks).filter(c => c.current > 0)

);

export const selBookmarkClickedCount = createSelector(

	selBookmarkClicked,
	list => list.length

);