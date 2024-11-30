import { BookmarkEntityCreateEffects } from '@effects/bookmark/bookmark-entity-create.effects';
import { BookmarkEntityUpdateEffects } from '@effects/bookmark/bookmark-entity-update.effects';
import { BookmarkLoadEffects } from '@effects/bookmark/bookmark-load.effects';
import { BookmarkSyncClicksEffects } from '@effects/bookmark/bookmark-sync-clicks.effects';
import { BookmarkUIEffects } from '@effects/bookmark/bookmark-ui.effects';
import { CoreLoadEffects } from '@effects/core/core-load.effects';
import { CoreNavigationEffects } from '@effects/core/core-navigation.effects';
import { CoreNotificationEffects } from '@effects/core/core-notification.effects';
import { CoreThemeEffects } from '@effects/core/core-theme.effects';
import { CoreUIEffects } from '@effects/core/core-ui.effects';
import { DatabaseReportEffects } from '@effects/database/database-report.effects';
import { DatabaseEffects } from '@effects/database/database.effects';
import { EntityCreateEffects } from '@effects/entity/entity-create.effects';
import { EntityLoadEffects } from '@effects/entity/entity-load.effects';
import { EntityMoveToTrashEffects } from '@effects/entity/entity-move-to-trash.effects';
import { EntitySyncDeletedDeletedEffects } from '@effects/entity/entity-sync-deleted-deleted.effects';
import { EntitySyncLocalDeletedEffects } from '@effects/entity/entity-sync-local-deleted.effects';
import { EntitySyncLocalNewEffects } from '@effects/entity/entity-sync-local-new.effects';
import { EntitySyncLocalUpdatedEffects } from '@effects/entity/entity-sync-local-updated.effects';
import { EntitySyncRemoteDeletedEffects } from '@effects/entity/entity-sync-remote-deleted.effects';
import { EntitySyncRemoteNewEffects } from '@effects/entity/entity-sync-remote-new.effects';
import { EntitySyncRemoteRefreshEffects } from '@effects/entity/entity-sync-remote-refresh.effects';
import { EntitySyncRemoteUpdatedEffects } from '@effects/entity/entity-sync-remote-updated.effects';
import { EntityUpdateEffects } from '@effects/entity/entity-update.effects';
import { LogsEffects } from '@effects/log/logs.effects';
import { NoteContentCreateEffects } from '@effects/note-content/note-content-create.effects';
import { NoteContentLoadEffects } from '@effects/note-content/note-content-load.effects';
import { NoteContentUpdateEffects } from '@effects/note-content/note-content-update.effects';
import { NoteCreateEffects } from '@effects/note/note-create.effects';
import { NoteUIEffects } from '@effects/note/note-ui.effects';
import { NoteUpdateEffects } from '@effects/note/note-update.effects';
import { ProjectCreateEffects } from '@effects/project/project-create.effects';
import { ProjectUIEffects } from '@effects/project/project-ui.effects';
import { ProjectUpdateEffects } from '@effects/project/project-update.effects';
import { QuizEntryCreateEffects } from '@effects/quiz-entry/quiz-entry-create.effects';
import { QuizEntryLogicEffects } from '@effects/quiz-entry/quiz-entry-logic.effects';
import { QuizUIEffects } from '@effects/quiz-entry/quiz-ui.effects';
import { QuoteViewerEffects } from '@effects/quote/quote-viewer.effects';
import { SettingsEffects } from '@effects/setting/settings.effects';
import { TaskCreateEffects } from '@effects/task/project-task-create.effects';
import { TaskEditEffects } from '@effects/task/project-task-edit-dialog.effects';
import { TaskUIEffects } from '@effects/task/project-task-ui.effects';
import { TaskUpdateEffects } from '@effects/task/project-task-update.effects';
import { WordCreateEffects } from '@effects/word/word-create.effects';
import { WordUIEffects } from '@effects/word/word-ui.effects';
import { WordUpdateEffects } from '@effects/word/word-update.effects';
import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { bookmarkReducer } from '@reducers/bookmark/bookmark.reducer';
import { cloudReducer } from '@reducers/cloud/cloud.reducer';
import { coreReducer } from '@reducers/core/core.reducer';
import { databaseReducer } from '@reducers/database/database.reducer';
import { entitiesReducer } from '@reducers/entity/entities.reducer';
import { logsReducer } from '@reducers/log/logs.reducer';
import { noteReducer } from '@reducers/note/note.reducer';
import { projectReducer } from '@reducers/project/project.reducer';
import { quizEntryReducer } from '@reducers/quiz-entry/quiz-entry.reducer';
import { quoteReducer } from '@reducers/quote/quote.reducer';
import { taskReducer } from '@reducers/task/task.reducer';
import { testSuiteReducer } from '@reducers/test-suite/test-suite.reducer';
import { wordReducer } from '@reducers/word/word.reducer';
import { AppState } from './states/app.state';

function debug(reducer: ActionReducer<AppState>): ActionReducer<AppState> {

	return function (state: AppState | undefined, action: Action) {

		// code here
		console.log('state', state);
		console.log('action', action);
		return reducer(state, action);

	};

}

export const metaReducers: MetaReducer<AppState>[] = [

	// clearState

];

export const effectList = [

	// Core
	CoreLoadEffects,
	CoreNavigationEffects,
	CoreNotificationEffects,
	CoreUIEffects,
	CoreThemeEffects,

	// Entity
	EntityCreateEffects,
	EntityLoadEffects,
	EntityUpdateEffects,
	EntityMoveToTrashEffects,

	EntitySyncRemoteRefreshEffects,

	EntitySyncLocalNewEffects,
	EntitySyncLocalUpdatedEffects,
	EntitySyncLocalDeletedEffects,

	EntitySyncRemoteNewEffects,
	EntitySyncRemoteUpdatedEffects,
	EntitySyncRemoteDeletedEffects,

	EntitySyncDeletedDeletedEffects,

	// Bookmarks
	BookmarkSyncClicksEffects,

	BookmarkLoadEffects,
	BookmarkUIEffects,
	BookmarkEntityCreateEffects,
	BookmarkEntityUpdateEffects,

	// Notes
	NoteUIEffects,
	NoteCreateEffects,
	NoteUpdateEffects,

	// Note Content
	NoteContentLoadEffects,
	NoteContentCreateEffects,
	NoteContentUpdateEffects,

	// Projects
	ProjectUIEffects,
	ProjectCreateEffects,
	ProjectUpdateEffects,

	// Project Tasks
	TaskEditEffects,
	TaskCreateEffects,
	TaskUpdateEffects,
	TaskUIEffects,

	// Words
	WordUIEffects,
	WordCreateEffects,
	WordUpdateEffects,

	// Quiz
	QuizUIEffects,
	QuizEntryLogicEffects,
	QuizEntryCreateEffects,

	// Quotes
	QuoteViewerEffects,

	// Database
	DatabaseEffects,
	DatabaseReportEffects,

	// Settings
	SettingsEffects,

	// Logs
	LogsEffects

];

export const reducerList: ActionReducerMap<AppState> = {

	entities: entitiesReducer,
	bookmark: combineReducers(bookmarkReducer),
	core: combineReducers(coreReducer),
	cloud: cloudReducer,
	database: databaseReducer,
	logs: combineReducers(logsReducer),
	note: combineReducers(noteReducer),
	project: combineReducers(projectReducer),
	quizEntry: combineReducers(quizEntryReducer),
	quote: combineReducers(quoteReducer),
	task: combineReducers(taskReducer),
	testSuites: combineReducers(testSuiteReducer),
	word: combineReducers(wordReducer)

};
