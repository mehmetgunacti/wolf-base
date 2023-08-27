import { BookmarkModuleState, initialBookmarkState } from "./bookmark.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { StatsModuleState, initialStatsState } from "./stats.state";

export interface AppState {

	core: CoreModuleState,
	bookmark: BookmarkModuleState,
	stats: StatsModuleState

}

export const initialAppState: AppState = {

	core: initialCoreState,
	bookmark: initialBookmarkState,
	stats: initialStatsState

};
