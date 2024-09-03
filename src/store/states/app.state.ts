import { BookmarkModuleState, bookmark_initialState } from "./bookmark.state";
import { CloudModuleState, initialCloudState } from "./cloud.state";
import { CoreModuleState, initialCoreState } from "./core.state";
import { DatabaseModuleState, initialDatabaseState } from "./database.state";
import { entity_initialState, Entity_ModuleState } from './entity.state';
import { Logs_ModuleState, initialLogsState } from "./logs.state";
import { Note_ModuleState, initialNoteState } from './note.state';
import { initialTaskState, Task_ModuleState } from './task.state';
import { initialProjectState, Project_ModuleState } from './project.state';
import { QuizEntry_ModuleState, quizEntry_initialModuleState } from './quiz-entry.state';
import { Quote_ModuleState, quote_initialModuleState } from './quote.state';
import { Word_ModuleState, initialWordState } from './word.state';

export interface AppState {

	entities: Entity_ModuleState,
	bookmark: BookmarkModuleState,
	core: CoreModuleState,
	cloud: CloudModuleState,
	database: DatabaseModuleState,
	logs: Logs_ModuleState,
	note: Note_ModuleState,
	project: Project_ModuleState,
	quizEntry: QuizEntry_ModuleState,
	quote: Quote_ModuleState,
	task: Task_ModuleState,
	word: Word_ModuleState,

}

export const initialAppState: AppState = {

	entities: entity_initialState,
	core: initialCoreState,
	bookmark: bookmark_initialState,
	cloud: initialCloudState,
	database: initialDatabaseState,
	logs: initialLogsState,
	note: initialNoteState,
	project: initialProjectState,
	quizEntry: quizEntry_initialModuleState,
	quote: quote_initialModuleState,
	task: initialTaskState,
	word: initialWordState

};
