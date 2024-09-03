import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';

import * as effects from './effects';
import * as reducers from './reducers';

import { AppState } from './states/app.state';

function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {

	return function (state: AppState | undefined, action: Action) {

		// code here
		return reducer(state, action);

	};

}

export const metaReducers: MetaReducer<AppState>[] = [

	// clearState

];

export const effectList = [

	// Core
	effects.CoreLoadEffects,
	effects.CoreNavigationEffects,
	effects.CoreNotificationEffects,
	effects.CoreUIEffects,
	effects.CoreThemeEffects,
	effects.CoreSidebarEffects,

	// Entity
	effects.EntityCreateEffects,
	effects.EntityLoadEffects,
	effects.EntityUpdateEffects,
	effects.EntityMoveToTrashEffects,

	effects.EntitySyncRemoteRefreshEffects,

	effects.EntitySyncLocalNewEffects,
	effects.EntitySyncLocalUpdatedEffects,
	effects.EntitySyncLocalDeletedEffects,

	effects.EntitySyncRemoteNewEffects,
	effects.EntitySyncRemoteUpdatedEffects,
	effects.EntitySyncRemoteDeletedEffects,

	effects.EntitySyncDeletedDeletedEffects,

	// Bookmarks
	effects.BookmarkSyncClicksEffects,

	effects.BookmarkLoadEffects,
	effects.BookmarkUIEffects,
	effects.BookmarkEntityCreateEffects,
	effects.BookmarkEntityUpdateEffects,

	// Notes
	effects.NoteUIEffects,
	effects.NoteCreateEffects,
	effects.NoteUpdateEffects,

	// Note Content
	effects.NoteContentLoadEffects,
	effects.NoteContentCreateEffects,
	effects.NoteContentUpdateEffects,

	// Projects
	effects.ProjectUIEffects,
	effects.ProjectCreateEffects,
	effects.ProjectUpdateEffects,

	// Project Tasks
	effects.TaskEditEffects,
	effects.TaskCreateEffects,
	effects.TaskUpdateEffects,
	effects.TaskUIEffects,

	// Words
	effects.WordUIEffects,
	effects.WordCreateEffects,
	effects.WordUpdateEffects,

	// Quiz
	effects.QuizUIEffects,
	effects.QuizEntryLogicEffects,
	effects.QuizEntryCreateEffects,

	// Quotes
	effects.QuoteViewerEffects,

	// Database
	effects.DatabaseEffects,

	// Settings
	effects.SettingsEffects,

	// Logs
	effects.LogsEffects

];

export const reducerList: ActionReducerMap<AppState> = {

	entities: reducers.entitiesReducer,
	bookmark: combineReducers(reducers.bookmarkReducer),
	core: combineReducers(reducers.coreReducer),
	cloud: reducers.cloudReducer,
	database: reducers.databaseReducer,
	logs: combineReducers(reducers.logsReducer),
	note: combineReducers(reducers.noteReducer),
	project: combineReducers(reducers.projectReducer),
	quizEntry: combineReducers(reducers.quizEntryReducer),
	quote: combineReducers(reducers.quoteReducer),
	task: combineReducers(reducers.taskReducer),
	word: combineReducers(reducers.wordReducer)

};
