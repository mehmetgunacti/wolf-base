import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { BookmarkEntitiesEffects } from './effects/bookmark-entities.effects';
import { BookmarkLocalStorageEffects } from './effects/bookmark-local-storage.effects';
import { CoreNavigationEffects } from './effects/core-navigation.effects';
import { CoreNotificationEffects } from './effects/core-notification.effects';
import { CoreSettingsEffects } from './effects/core-settings.effects';
import { CoreThemeEffects } from './effects/core-theme.effects';
import { CoreUIEffects } from './effects/core-ui.effects';
import { CoreEffects } from './effects/core.effects';
import { DatabaseEffects } from './effects/database.effects';
import { SettingsEffects } from './effects/settings.effects';
import { StatsBookmarkEffects } from './effects/stats-bookmark.effects';
import { StatsEffects } from './effects/stats.effects';
import { bookmarkReducer } from './reducers/bookmark.reducer';
import { coreReducer } from './reducers/core.reducer';
import { databaseReducer } from './reducers/database.reducer';
import { statsReducer } from './reducers/stats.reducer';
import { AppState } from './states/app.state';
import { LogEffects } from './effects/log.effects';

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
	CoreSettingsEffects,

	// Bookmarks
	BookmarkEntitiesEffects,
	BookmarkLocalStorageEffects,
	StatsBookmarkEffects,

	// Database
	DatabaseEffects,

	// Stats
	StatsEffects,

	// Settings
	SettingsEffects,

	// Logs
	LogEffects

];

export const reducers: ActionReducerMap<AppState> = {

	core: combineReducers(coreReducer),
	stats: statsReducer,
	bookmark: combineReducers(bookmarkReducer),
	database: databaseReducer

};
