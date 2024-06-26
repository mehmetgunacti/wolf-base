import { BookmarkModuleState, initialBookmarkState } from "./bookmark.state";
import { CloudModuleState, initialCloudState } from "./cloud.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { DatabaseModuleState, initialDatabaseState } from "./database.state";
import { Logs_ModuleState, initialLogsState } from "./logs.state";
import { NoteContent_ModuleState, noteContent_initialState } from './note-content.state';
import { Note_ModuleState, initialNoteState } from './note.state';
import { Word_ModuleState, initialWordState } from './word.state';

export interface AppState {

	core: CoreModuleState,
	bookmark: BookmarkModuleState,
	note: Note_ModuleState,
	noteContent: NoteContent_ModuleState,
	word: Word_ModuleState,
	database: DatabaseModuleState,
	logs: Logs_ModuleState,
	cloud: CloudModuleState

}

export const initialAppState: AppState = {

	core: initialCoreState,
	bookmark: initialBookmarkState,
	note: initialNoteState,
	noteContent: noteContent_initialState,
	word: initialWordState,
	database: initialDatabaseState,
	logs: initialLogsState,
	cloud: initialCloudState

};
