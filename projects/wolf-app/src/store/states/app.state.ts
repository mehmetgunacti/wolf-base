import { BookmarkModuleState, initialBookmarkState } from "./bookmark.state";
import { CloudModuleState, initialCloudState } from "./cloud.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { DatabaseModuleState, initialDatabaseState } from "./database.state";
import { LogsModuleState, initialLogsState } from "./logs.state";
import { NoteModuleState, initialNoteState } from './note.state';

export interface AppState {

	core: CoreModuleState,
	bookmark: BookmarkModuleState,
	note: NoteModuleState,
	database: DatabaseModuleState,
	logs: LogsModuleState,
	cloud: CloudModuleState

}

export const initialAppState: AppState = {

	core: initialCoreState,
	bookmark: initialBookmarkState,
	note: initialNoteState,
	database: initialDatabaseState,
	logs: initialLogsState,
	cloud: initialCloudState

};
