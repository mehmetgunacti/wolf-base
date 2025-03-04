import { TAG_POPULAR } from '@constants/bookmark.constant';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { Bookmark, Click, ClickedBookmark, NamedClick } from '@models/bookmark.model';
import { SyncTaskType, toCloudTask } from '@models/cloud.model';
import { createSelector } from '@ngrx/store';
import { selBookmark_EntityList, selBookmark_EntityState } from '../entity/entity-bookmark.selectors';
import { selBookmark_ClicksState } from './bookmark.selectors';

// todo : selector names need refactoring

const selBookmark_Clicks = createSelector(

	selBookmark_ClicksState,
	(state): Record<UUID, Click> => state.values

);

export const selBookmark_clickedBookmarks = createSelector(

	selBookmark_EntityList,
	selBookmark_Clicks,
	(list, clicks): Record<UUID, ClickedBookmark> => {

		const bookmarks = list as Bookmark[];
		return bookmarks.reduce(

			(acc, cur) => { acc[ cur.id ] = { ...cur, clicks: clicks[ cur.id ]?.total ?? 0 }; return acc; },
			{} as Record<UUID, ClickedBookmark>

		);

	}

);

const selBookmark_ids = createSelector(

	selBookmark_EntityState,
	state => Object.keys(state.entities)

);

export const selBookmark_array = createSelector(

	selBookmark_clickedBookmarks,
	(clickedBookmarks): ClickedBookmark[] => Object.values(clickedBookmarks)

);

export const selBookmark_count = createSelector(

	selBookmark_ids,
	ids => ids.length

);

export const selBookmark_clicked = createSelector(

	selBookmark_EntityState,
	selBookmark_Clicks,
	(state, clicks): NamedClick[] =>
		Object
			.values(clicks)
			.filter(c => c.current > 0 && !!state.entities[ c.id ])
			.map(c => ({ ...c, name: state.entities[ c.id ].name }))

);

export const selBookmark_clickedCount = createSelector(

	selBookmark_clicked,
	list => list.length

);

export const selBoomkark_clickedCloudTasks = createSelector(

	selBookmark_clicked,
	items => {

		if (items.length > 0)
			return toCloudTask(items, AppEntityType.bookmark, SyncTaskType.clicked);
		return null;

	}

);

export const selBookmark_popular = createSelector(

	selBookmark_array,
	bookmarks => {

		return bookmarks
			.filter(b => b.tags.includes(TAG_POPULAR))
			.sort((b1, b2) => b2.clicks - b1.clicks);

	}

);
