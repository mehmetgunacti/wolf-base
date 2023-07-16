import { createFeatureSelector, createSelector } from "@ngrx/store";
import { bookmarksArray } from "../../bookmark/selectors/entities.selector";
import { SyncModuleState } from "../states";

export const syncModuleState = createFeatureSelector<SyncModuleState>('sync');

export const messages = createSelector(

	syncModuleState,
	(state: SyncModuleState): string[] => state.messages

);

export const isFirestoreConfigDialogVisible = createSelector(

	syncModuleState,
	state => state.firestoreConfigDialogVisible

);

export const bookmarksCreated = createSelector(

	syncModuleState,
	bookmarksArray,
	(state, bookmarks) => {

		const syncIds = new Set(state.syncData.map(s => s.id));
		return bookmarks.filter(b => syncIds.has(b.id)).length

	}

);

export const bookmarksDeleted = createSelector(

	syncModuleState,
	state => state.trashCount

);

export const bookmarksUpdated = createSelector(

	syncModuleState,
	state => state.syncData.filter(s => s.updated).length

);