import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { CoreLoadEffects } from './effects/core-load.effects';
import { CoreNotificationEffects } from './effects/core-notification.effects';
import { CoreThemeEffects } from './effects/core-theme.effects';
import { CoreUIEffects } from './effects/core-ui.effects';
import { DatabaseEffects } from './effects/database.effects';
import { KnowledgeBaseEntitiesEffects } from './effects/knowledge-base-entities.effects';
import { LogsEffects } from './effects/logs.effects';
import { SettingsEffects } from './effects/settings.effects';
import { cloudReducer } from './reducers/cloud.reducer';
import { coreReducer } from './reducers/core.reducer';
import { databaseReducer } from './reducers/database.reducer';
import { knowledgeBaseReducer } from './reducers/knowledge-base.reducer';
import { logsReducer } from './reducers/logs.reducer';
import { AppState } from './states/app.state';
import { NoteSyncEffects } from './effects/note-effects/note-sync.effects';
import { NoteSyncLocalNewEffects } from './effects/note-effects/note-sync-local-new.effects';
import { NoteSyncLocalUpdatedEffects } from './effects/note-effects/note-sync-local-updated.effects';
import { NoteSyncLocalDeletedEffects } from './effects/note-effects/note-sync-local-deleted.effects';
import { NoteSyncRemoteNewEffects } from './effects/note-effects/note-sync-remote-new.effects';
import { NoteSyncRemoteUpdatedEffects } from './effects/note-effects/note-sync-remote-updated.effects';
import { NoteSyncRemoteDeletedEffects } from './effects/note-effects/note-sync-remote-deleted.effects';
import { NoteSyncDeletedDeletedEffects } from './effects/note-effects/note-sync-deleted-deleted.effects';
import { NoteEntityCreateEffects } from './effects/note-effects/note-entity-create.effects';
import { NoteEntityUpdateEffects } from './effects/note-effects/note-entity-update.effects';
import { NoteEntityMoveToTrashEffects } from './effects/note-effects/note-entity-move-to-trash.effects';
import { NoteLoadEffects } from './effects/note-effects/note-load.effects';
import { NoteUIEffects } from './effects/note-effects/note-ui.effects';
import { BookmarkSyncEffects } from './effects/bookmark-effects/bookmark-sync.effects';
import { BookmarkSyncLocalNewEffects } from './effects/bookmark-effects/bookmark-sync-local-new.effects';
import { BookmarkSyncLocalUpdatedEffects } from './effects/bookmark-effects/bookmark-sync-local-updated.effects';
import { BookmarkSyncLocalDeletedEffects } from './effects/bookmark-effects/bookmark-sync-local-deleted.effects';
import { BookmarkSyncRemoteNewEffects } from './effects/bookmark-effects/bookmark-sync-remote-new.effects';
import { BookmarkSyncRemoteUpdatedEffects } from './effects/bookmark-effects/bookmark-sync-remote-updated.effects';
import { BookmarkSyncRemoteDeletedEffects } from './effects/bookmark-effects/bookmark-sync-remote-deleted.effects';
import { BookmarkSyncDeletedDeletedEffects } from './effects/bookmark-effects/bookmark-sync-deleted-deleted.effects';
import { BookmarkSyncClicksEffects } from './effects/bookmark-effects/bookmark-sync-clicks.effects';
import { BookmarkEntityCreateEffects } from './effects/bookmark-effects/bookmark-entity-create.effects';
import { BookmarkEntityUpdateEffects } from './effects/bookmark-effects/bookmark-entity-update.effects';
import { BookmarkEntityMoveToTrashEffects } from './effects/bookmark-effects/bookmark-entity-move-to-trash.effects';
import { BookmarkLoadEffects } from './effects/bookmark-effects/bookmark-load.effects';
import { BookmarkUIEffects } from './effects/bookmark-effects/bookmark-ui.effects';
import { bookmarkReducer } from './reducers/bookmark-reducers/bookmark.reducer';
import { noteReducer } from './reducers/note-reducers/note.reducer';

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
	CoreNotificationEffects,
	CoreUIEffects,
	CoreThemeEffects,

	// Bookmarks
	BookmarkSyncEffects,

	BookmarkSyncLocalNewEffects,
	BookmarkSyncLocalUpdatedEffects,
	BookmarkSyncLocalDeletedEffects,

	BookmarkSyncRemoteNewEffects,
	BookmarkSyncRemoteUpdatedEffects,
	BookmarkSyncRemoteDeletedEffects,

	BookmarkSyncDeletedDeletedEffects,

	BookmarkSyncClicksEffects,

	BookmarkEntityCreateEffects,
	BookmarkEntityUpdateEffects,
	BookmarkEntityMoveToTrashEffects,

	BookmarkLoadEffects,
	BookmarkUIEffects,

	// Notes
	NoteSyncEffects,

	NoteSyncLocalNewEffects,
	NoteSyncLocalUpdatedEffects,
	NoteSyncLocalDeletedEffects,

	NoteSyncRemoteNewEffects,
	NoteSyncRemoteUpdatedEffects,
	NoteSyncRemoteDeletedEffects,

	NoteSyncDeletedDeletedEffects,

	NoteEntityCreateEffects,
	NoteEntityUpdateEffects,
	NoteEntityMoveToTrashEffects,

	NoteLoadEffects,
	NoteUIEffects,

	// Knowledge Base
	KnowledgeBaseEntitiesEffects,

	// Database
	DatabaseEffects,

	// Settings
	SettingsEffects,

	// Logs
	LogsEffects

];

export const reducers: ActionReducerMap<AppState> = {

	core: combineReducers(coreReducer),
	cloud: cloudReducer,
	bookmark: combineReducers(bookmarkReducer),
	note: combineReducers(noteReducer),
	knowledgeBase: combineReducers(knowledgeBaseReducer),
	database: databaseReducer,
	logs: combineReducers(logsReducer)

};
