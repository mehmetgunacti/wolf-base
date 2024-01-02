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

export const selBM_clickedBookmarks = createSelector(

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

const selBM_ids = createSelector(

	selBookmarkEntitiesState,
	state => Object.keys(state.entities)

);

export const selBM_array = createSelector(

	selBM_clickedBookmarks,
	(clickedBookmarks): ClickedBookmark[] => Object.values(clickedBookmarks)

);

export const selBM_count = createSelector(

	selBM_ids,
	ids => ids.length

);

export const selBM_clicked = createSelector(

	selBookmarkEntitiesState,
	(state): NamedClick[] =>
		Object
			.values(state.clicks)
			.filter(c => c.current > 0 && !!state.entities[c.id])
			.map(c => ({ ...c, name: state.entities[c.id].name }))

);

export const selBM_clickedCount = createSelector(

	selBM_clicked,
	list => list.length

);
