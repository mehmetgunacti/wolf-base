import * as fromBookmark from './bookmark';
import * as fromCore from './core';

export interface AppState {

	core: fromCore.CoreModuleState,
	bookmark: fromBookmark.BookmarkModuleState

}

export const initialAppState: AppState = {

	core: fromCore.initialCoreState,
	bookmark: fromBookmark.initialBookmarkState

};
