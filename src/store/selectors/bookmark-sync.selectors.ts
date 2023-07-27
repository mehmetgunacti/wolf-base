import { createSelector } from '@ngrx/store';
import { bookmarksArray } from './bookmark-entities.selectors';
import { selectorBookmarkModuleState } from './bookmark.selectors';

const selectorSyncState = createSelector(

	selectorBookmarkModuleState,
	state => state.sync

)

const bookmarkErrors = createSelector(

	selectorSyncState,
	state => state.syncData.filter(sd => !!sd.error)

);

export const bookmarkErrorsCount = createSelector(

	bookmarkErrors,
	list => list.length

);

const bookmarkCreated = createSelector(

	selectorSyncState,
	bookmarksArray,
	(state, entities) => {

		const syncIds = new Set(state.syncData.map(s => s.id));
		return entities.filter(b => !syncIds.has(b.id))

	}

);

export const bookmarkCreatedCount = createSelector(

	bookmarkCreated,
	list => list.length

);

export const bookmarkDeletedCount = createSelector(

	selectorSyncState,
	state => state.trashCount

);

const bookmarkUpdated = createSelector(

	selectorSyncState,
	state => state.syncData.filter(s => s.updated)

);

export const bookmarkUpdatedCount = createSelector(

	bookmarkUpdated,
	list => list.length

);