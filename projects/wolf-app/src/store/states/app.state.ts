import { BookmarkModuleState, initialBookmarkState } from "./bookmark.state";
import { CloudModuleState, initialCloudState } from "./cloud.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { DatabaseModuleState, initialDatabaseState } from "./database.state";
import { LogsModuleState, initialLogsState } from "./logs.state";
import { NoteContent_ModuleState, noteContent_initialState } from './note-content.state';
import { Note_ModuleState, initialNoteState } from './note.state';

export interface AppState {

	core: CoreModuleState,
	bookmark: BookmarkModuleState,
	note: Note_ModuleState,
	noteContent: NoteContent_ModuleState,
	database: DatabaseModuleState,
	logs: LogsModuleState,
	cloud: CloudModuleState

}

export const initialAppState: AppState = {

	core: initialCoreState,
	bookmark: initialBookmarkState,
	note: initialNoteState,
	noteContent: noteContent_initialState,
	database: initialDatabaseState,
	logs: initialLogsState,
	cloud: initialCloudState

};
