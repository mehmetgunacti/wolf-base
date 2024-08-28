import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { BookmarkLoadEffects } from './effects/bookmark-effects/bookmark-load.effects';
import { BookmarkSyncClicksEffects } from './effects/bookmark-effects/bookmark-sync-clicks.effects';
import { BookmarkUIEffects } from './effects/bookmark-effects/bookmark-ui.effects';
import { CoreLoadEffects } from './effects/core-load.effects';
import { CoreNavigationEffects } from './effects/core-navigation.effects';
import { CoreNotificationEffects } from './effects/core-notification.effects';
import { CoreSidebarEffects } from './effects/core-sidebar.effects';
import { CoreThemeEffects } from './effects/core-theme.effects';
import { CoreUIEffects } from './effects/core-ui.effects';
import { DatabaseEffects } from './effects/database.effects';
import { EntityCreateEffects } from './effects/entity-effects/entity-create.effects';
import { EntityLoadEffects } from './effects/entity-effects/entity-load.effects';
import { EntityUpdateEffects } from './effects/entity-effects/entity-update.effects';
import { LogsEffects } from './effects/logs.effects';
import { EntitySyncDeletedDeletedEffects } from './effects/entity-effects/entity-sync-deleted-deleted.effects';
import { EntitySyncLocalDeletedEffects } from './effects/entity-effects/entity-sync-local-deleted.effects';
import { EntitySyncLocalNewEffects } from './effects/entity-effects/entity-sync-local-new.effects';
import { EntitySyncLocalUpdatedEffects } from './effects/entity-effects/entity-sync-local-updated.effects';
import { EntitySyncRemoteDeletedEffects } from './effects/entity-effects/entity-sync-remote-deleted.effects';
import { EntitySyncRemoteNewEffects } from './effects/entity-effects/entity-sync-remote-new.effects';
import { EntitySyncRemoteUpdatedEffects } from './effects/entity-effects/entity-sync-remote-updated.effects';
import { EntitySyncRemoteRefreshEffects } from './effects/entity-effects/entity-sync-remote-refresh.effects';
import { NoteUIEffects } from './effects/note-effects/note-ui.effects';
import { ProjectUIEffects } from './effects/project-effects/project-ui.effects';
import { TaskEditEffects } from './effects/project-task-effects/project-task-edit-dialog.effects';
import { TaskUIEffects } from './effects/project-task-effects/project-task-ui.effects';
import { QuizUIEffects } from './effects/quiz-entry-effects/quiz-ui.effects';
import { QuoteViewerEffects } from './effects/quote-effects/quote-viewer.effects';
import { SettingsEffects } from './effects/settings.effects';
import { WordUIEffects } from './effects/word-effects/word-ui.effects';
import { bookmarkReducer } from './reducers/bookmark-reducers/bookmark.reducer';
import { cloudReducer } from './reducers/cloud.reducer';
import { coreReducer } from './reducers/core.reducer';
import { databaseReducer } from './reducers/database.reducer';
import { entitiesReducer } from './reducers/entity-reducers/entities.reducer';
import { logsReducer } from './reducers/logs.reducer';
import { noteContentReducer } from './reducers/note-content-reducers/note-content.reducer';
import { noteReducer } from './reducers/note-reducers/note.reducer';
import { projectReducer } from './reducers/project-reducers/project.reducer';
import { taskReducer } from './reducers/project-task-reducers/task.reducer';
import { quizEntryReducer } from './reducers/quiz-entry-reducers/quiz-entry.reducer';
import { quoteReducer } from './reducers/quote-reducers/quote.reducer';
import { wordReducer } from './reducers/word-reducers/word.reducer';
import { AppState } from './states/app.state';
import { EntityMoveToTrashEffects } from './effects/entity-effects/entity-move-to-trash.effects';

function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {

	return function (state: AppState | undefined, action: Action) {

		// code here
		return reducer(state, action);

	};

}

export const metaReducers: MetaReducer<AppState>[] = [

	// clearState

];

export const effects = [

	// Core
	CoreLoadEffects,
	CoreNavigationEffects,
	CoreNotificationEffects,
	CoreUIEffects,
	CoreThemeEffects,
	CoreSidebarEffects,

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

	// Notes
	NoteUIEffects,

	// Projects
	ProjectUIEffects,

	// Project Tasks
	TaskEditEffects,

	TaskUIEffects,

	// Words
	WordUIEffects,

	// Quiz
	QuizUIEffects,

	// Quotes
	QuoteViewerEffects,

	// Database
	DatabaseEffects,

	// Settings
	SettingsEffects,

	// Logs
	LogsEffects

];

export const reducers: ActionReducerMap<AppState> = {

	entities: entitiesReducer,
	bookmark: combineReducers(bookmarkReducer),
	core: combineReducers(coreReducer),
	cloud: cloudReducer,
	database: databaseReducer,
	logs: combineReducers(logsReducer),
	note: combineReducers(noteReducer),
	noteContent: combineReducers(noteContentReducer),
	project: combineReducers(projectReducer),
	quizEntry: combineReducers(quizEntryReducer),
	quote: combineReducers(quoteReducer),
	task: combineReducers(taskReducer),
	word: combineReducers(wordReducer)

};
