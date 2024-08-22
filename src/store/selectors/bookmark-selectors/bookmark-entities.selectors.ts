import { Bookmark, Click, ClickedBookmark, NamedClick, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selBookmark_ClicksState, selBookmark_EntitiesState } from './bookmark.selectors';

export const selBookmark_entities = createSelector(

	selBookmark_EntitiesState,
	(entities): Record<UUID, Bookmark> => entities.entities as Record<UUID, Bookmark>

);

const selBookmark_Clicks = createSelector(

	selBookmark_ClicksState,
	(state): Record<UUID, Click> => state.values

);

export const selBM_clickedBookmarks = createSelector(

	selBookmark_entities,
	selBookmark_Clicks,
	(bookmarks, clicks): Record<UUID, ClickedBookmark> => {

		const bm: Record<UUID, ClickedBookmark> = {};
		Object.keys(bookmarks).forEach(
			id => bm[id] = { ...bookmarks[id], clicks: clicks[id]?.total ?? 0 }
		);
		return bm;

	}

);

const selBookmark_ids = createSelector(

	selBookmark_EntitiesState,
	state => Object.keys(state.entities)

);

export const selBookmark_array = createSelector(

	selBM_clickedBookmarks,
	(clickedBookmarks): ClickedBookmark[] => Object.values(clickedBookmarks)

);

export const selBookmark_count = createSelector(

	selBookmark_ids,
	ids => ids.length

);

export const selBookmark_clicked = createSelector(

	selBookmark_EntitiesState,
	selBookmark_Clicks,
	(state, clicks): NamedClick[] =>
		Object
			.values(clicks)
			.filter(c => c.current > 0 && !!state.entities[c.id])
			.map(c => ({ ...c, name: state.entities[c.id].name }))

);

export const selBookmark_clickedCount = createSelector(

	selBookmark_clicked,
	list => list.length

);
