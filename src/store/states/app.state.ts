import { BookmarkModuleState, initialBookmarkState } from "./bookmark.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { DatabaseModuleState, initialDatabaseState } from "./database.state";
import { StatsModuleState, initialStatsState } from "./stats.state";

export interface AppState {

	core: CoreModuleState,
	bookmark: BookmarkModuleState,
	database: DatabaseModuleState,
	stats: StatsModuleState

}

export const initialAppState: AppState = {

	core: initialCoreState,
	bookmark: initialBookmarkState,
	database: initialDatabaseState,
	stats: initialStatsState

};
