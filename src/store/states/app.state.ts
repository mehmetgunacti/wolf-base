import { BookmarkModuleState, initialBookmarkState } from "./bookmark.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { DatabaseModuleState, initialDatabaseState } from "./database.state";
import { KnowledgeBaseModuleState, initialKnowledgeBaseState } from "./knowledge-base.state";
import { LogsModuleState, initialLogsState } from "./logs.state";
import { StatsModuleState, initialStatsState } from "./stats.state";

export interface AppState {

	core: CoreModuleState,
	bookmark: BookmarkModuleState,
	knowledgeBase: KnowledgeBaseModuleState,
	database: DatabaseModuleState,
	logs: LogsModuleState,
	stats: StatsModuleState

}

export const initialAppState: AppState = {

	core: initialCoreState,
	bookmark: initialBookmarkState,
	knowledgeBase: initialKnowledgeBaseState,
	database: initialDatabaseState,
	logs: initialLogsState,
	stats: initialStatsState

};
