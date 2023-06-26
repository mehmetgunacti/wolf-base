import * as fromBookmark from './bookmark';
import * as fromCore from './core';
import * as fromSync from './sync';

export interface AppState {

	core: fromCore.CoreModuleState,
	bookmark: fromBookmark.BookmarkModuleState,
	sync: fromSync.SyncModuleState

}

export const initialAppState: AppState = {

	core: fromCore.initialCoreState,
	bookmark: fromBookmark.initialBookmarkState,
	sync: fromSync.initialSyncState

};
