import { BookmarkModuleState, initialBookmarkState } from "./bookmark.state";
import { CloudModuleState, initialCloudState } from "./cloud.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { DatabaseModuleState, initialDatabaseState } from "./database.state";
import { Logs_ModuleState, initialLogsState } from "./logs.state";
import { NoteContent_ModuleState, noteContent_initialState } from './note-content.state';
import { Note_ModuleState, initialNoteState } from './note.state';
import { initialProjectState, Project_ModuleState } from './project.state';
import { QuizEntry_ModuleState, quizEntry_initialModuleState } from './quiz-entry.state';
import { Quote_ModuleState, quote_initialModuleState } from './quote.state';
import { Word_ModuleState, initialWordState } from './word.state';

export interface AppState {

	bookmark: BookmarkModuleState,
	core: CoreModuleState,
	cloud: CloudModuleState,
	database: DatabaseModuleState,
	logs: Logs_ModuleState,
	note: Note_ModuleState,
	noteContent: NoteContent_ModuleState,
	project: Project_ModuleState,
	quizEntry: QuizEntry_ModuleState,
	quote: Quote_ModuleState,
	word: Word_ModuleState,

}

export const initialAppState: AppState = {

	core: initialCoreState,
	bookmark: initialBookmarkState,
	cloud: initialCloudState,
	database: initialDatabaseState,
	logs: initialLogsState,
	note: initialNoteState,
	noteContent: noteContent_initialState,
	project: initialProjectState,
	quizEntry: quizEntry_initialModuleState,
	quote: quote_initialModuleState,
	word: initialWordState

};
