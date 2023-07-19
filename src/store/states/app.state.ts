import { BookmarkModuleState, initialBookmarkState } from "./bookmark.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { SyncModuleState, initialSyncState } from "./sync.state";

export interface AppState {

	core: CoreModuleState,
	bookmark: BookmarkModuleState,
	sync: SyncModuleState

}

export const initialAppState: AppState = {

	core: initialCoreState,
	bookmark: initialBookmarkState,
	sync: initialSyncState

};
