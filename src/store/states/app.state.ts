import { Bookmark_ModuleState, bookmark_initialState } from './bookmark.state';
import { Cloud_ModuleState, cloud_initialState } from './cloud.state';
import { Core_ModuleState, core_initialState } from './core.state';
import { Database_ModuleState, database_initialState } from './database.state';
import { Entity_ModuleState, entity_initialState } from './entity.state';
import { Exam_ModuleState, exam_initialState } from './exam.state';
import { Logs_ModuleState, log_initialState } from './logs.state';
import { Note_ModuleState, note_initialState } from './note.state';
import { Project_ModuleState, project_initialState } from './project.state';
import { QuizEntry_ModuleState, quizEntry_initialModuleState } from './quiz-entry.state';
import { Quote_ModuleState, quote_initialModuleState } from './quote.state';
import { Session_ModuleState, session_initialModuleState } from './session.state';
import { Task_ModuleState, task_initialState } from './task.state';
import { TestSuite_ModuleState, testSuite_initialState } from './test-suite.state';
import { Word_ModuleState, word_initialState } from './word.state';

export interface AppState {

	entities: Entity_ModuleState,
	bookmark: Bookmark_ModuleState,
	core: Core_ModuleState,
	cloud: Cloud_ModuleState,
	database: Database_ModuleState,
	exam: Exam_ModuleState,
	logs: Logs_ModuleState,
	note: Note_ModuleState,
	project: Project_ModuleState,
	quizEntry: QuizEntry_ModuleState,
	quote: Quote_ModuleState,
	session: Session_ModuleState,
	testSuite: TestSuite_ModuleState,
	task: Task_ModuleState,
	word: Word_ModuleState,

}

export const initialAppState: AppState = {

	entities: entity_initialState,
	core: core_initialState,
	bookmark: bookmark_initialState,
	cloud: cloud_initialState,
	database: database_initialState,
	exam: exam_initialState,
	logs: log_initialState,
	note: note_initialState,
	project: project_initialState,
	quizEntry: quizEntry_initialModuleState,
	quote: quote_initialModuleState,
	session: session_initialModuleState,
	task: task_initialState,
	testSuite: testSuite_initialState,
	word: word_initialState

};
