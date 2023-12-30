import { Bookmark, Click, ClickedBookmark, NamedClick, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selBookmarkEntitiesState } from './bookmark.selectors';

const selBMBookmarks = createSelector(

	selBookmarkEntitiesState,
	(state): Record<UUID, Bookmark> => state.entities

);

const selBMClicks = createSelector(

	selBookmarkEntitiesState,
	(state): Record<UUID, Click> => state.clicks

);

export const selBMClickedBookmarks = createSelector(

	selBMBookmarks,
	selBMClicks,
	(bookmarks, clicks): Record<UUID, ClickedBookmark> => {

		const bm: Record<UUID, ClickedBookmark> = {};
		Object.keys(bookmarks).forEach(
			id => bm[id] = { ...bookmarks[id], clicks: clicks[id]?.total ?? 0 }
		);
		return bm;

	}

);

const selBMIds = createSelector(

	selBookmarkEntitiesState,
	state => Object.keys(state.entities)

);

export const selBMBookmarksArray = createSelector(

	selBMClickedBookmarks,
	(clickedBookmarks): ClickedBookmark[] => Object.values(clickedBookmarks)

);

export const selBookmarksCount = createSelector(

	selBMIds,
	ids => ids.length

);

export const selBookmarkClicked = createSelector(

	selBookmarkEntitiesState,
	(state): NamedClick[] =>
		Object
			.values(state.clicks)
			.filter(c => c.current > 0 && !!state.entities[c.id])
			.map(c => ({ ...c, name: state.entities[c.id].name }))

);

export const selBookmarkClickedCount = createSelector(

	selBookmarkClicked,
	list => list.length

);
