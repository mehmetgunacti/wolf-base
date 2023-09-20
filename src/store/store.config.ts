import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { BookmarkEntitiesEffects } from './effects/bookmark-entities.effects';
import { BookmarkLocalStorageEffects } from './effects/bookmark-local-storage.effects';
import { CloudEffects } from './effects/cloud.effects';
import { CoreNavigationEffects } from './effects/core-navigation.effects';
import { CoreNotificationEffects } from './effects/core-notification.effects';
import { CoreThemeEffects } from './effects/core-theme.effects';
import { CoreUIEffects } from './effects/core-ui.effects';
import { CoreEffects } from './effects/core.effects';
import { DatabaseEffects } from './effects/database.effects';
import { LogsEffects } from './effects/logs.effects';
import { SettingsEffects } from './effects/settings.effects';
import { bookmarkReducer } from './reducers/bookmark.reducer';
import { cloudReducer } from './reducers/cloud.reducer';
import { coreReducer } from './reducers/core.reducer';
import { databaseReducer } from './reducers/database.reducer';
import { knowledgeBaseReducer } from './reducers/knowledge-base.reducer';
import { logsReducer } from './reducers/logs.reducer';
import { AppState } from './states/app.state';
import { CloudBookmarkEffects } from './effects/cloud-bookmark.effects';

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
	CoreNotificationEffects,
	CoreNavigationEffects,
	CoreUIEffects,
	CoreThemeEffects,

	// Bookmarks
	BookmarkEntitiesEffects,
	BookmarkLocalStorageEffects,

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
