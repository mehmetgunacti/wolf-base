import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { BookmarkEntityCreateEffects } from './effects/bookmark-entity-create.effects';
import { BookmarkEntityRemoveEffects } from './effects/bookmark-entity-remove.effects';
import { BookmarkEntityUpdateEffects } from './effects/bookmark-entity-update.effects';
import { BookmarkLoadEffects } from './effects/bookmark-load.effects';
import { BookmarkUIEffects } from './effects/bookmark-ui.effects';
import { CloudBookmarkEffects } from './effects/cloud-bookmark.effects';
import { CloudEffects } from './effects/cloud.effects';
import { CoreEntityEffects } from './effects/core-entity.effects';
import { CoreNavigationEffects } from './effects/core-navigation.effects';
import { CoreNotificationEffects } from './effects/core-notification.effects';
import { CoreThemeEffects } from './effects/core-theme.effects';
import { CoreUIEffects } from './effects/core-ui.effects';
import { CoreEffects } from './effects/core.effects';
import { DatabaseEffects } from './effects/database.effects';
import { KnowledgeBaseEntitiesEffects } from './effects/knowledge-base-entities.effects';
import { LogsEffects } from './effects/logs.effects';
import { SettingsEffects } from './effects/settings.effects';
import { bookmarkReducer } from './reducers/bookmark.reducer';
import { cloudReducer } from './reducers/cloud.reducer';
import { coreReducer } from './reducers/core.reducer';
import { databaseReducer } from './reducers/database.reducer';
import { knowledgeBaseReducer } from './reducers/knowledge-base.reducer';
import { logsReducer } from './reducers/logs.reducer';
import { AppState } from './states/app.state';
import { BookmarkSyncLocalNewEffects } from './effects/bookmark-sync-local-new.effects';
import { BookmarkSyncLocalUpdatedEffects } from './effects/bookmark-sync-local-updated.effects';

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
	CoreEffects,
	CoreEntityEffects,
	CoreNotificationEffects,
	CoreNavigationEffects,
	CoreUIEffects,
	CoreThemeEffects,

	// Bookmarks
	BookmarkSyncLocalNewEffects,
	BookmarkSyncLocalUpdatedEffects,

	BookmarkEntityCreateEffects,
	BookmarkEntityUpdateEffects,
	BookmarkEntityRemoveEffects,

	BookmarkLoadEffects,
	BookmarkUIEffects,

	// Knowledge Base
	KnowledgeBaseEntitiesEffects,

	// Database
	DatabaseEffects,

	// Cloud
	CloudEffects,
	CloudBookmarkEffects,

	// Settings
	SettingsEffects,

	// Logs
	LogsEffects

];

export const reducers: ActionReducerMap<AppState> = {

	core: combineReducers(coreReducer),
	cloud: cloudReducer,
	bookmark: combineReducers(bookmarkReducer),
	knowledgeBase: combineReducers(knowledgeBaseReducer),
	database: databaseReducer,
	logs: combineReducers(logsReducer)

};
