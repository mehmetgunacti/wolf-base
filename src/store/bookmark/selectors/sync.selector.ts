import { createSelector } from '@ngrx/store';
import { bookmarksArray } from './entities.selector';
import { selectorModuleState } from './module.selector';

const selectorSyncState = createSelector(
	selectorModuleState,
	state => state.sync
)

export const bookmarksCreated = createSelector(

	selectorSyncState,
	bookmarksArray,
	(state, entities) => {

		const syncIds = new Set(state.syncData.map(s => s.id));
		return entities.filter(b => !syncIds.has(b.id)).length

	}

);

export const bookmarksDeleted = createSelector(

	selectorModuleState,
	state => state.sync.trashCount

);

export const bookmarksUpdated = createSelector(

	selectorSyncState,
	state => state.syncData.filter(s => s.updated).length

);