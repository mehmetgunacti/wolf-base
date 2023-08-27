import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { BookmarkEntitiesEffects } from './effects/bookmark-entities.effects';
import { BookmarkSyncEffects } from './effects/bookmark-sync.effects';
import { CoreEffects } from './effects/core.effects';
import { CoreNavigationEffects } from './effects/core-navigation.effects';
import { CoreNotificationEffects } from './effects/core-notification.effects';
import { CoreThemeEffects } from './effects/core-theme.effects';
import { CoreUIEffects } from './effects/core-ui.effects';
import { bookmarkReducer } from './reducers/bookmark.reducer';
import { coreReducer } from './reducers/core.reducer';
import { AppState } from './states/app.state';
import { DatabaseEffects } from './effects/database.effects';
import { BookmarkRemoteEffects } from './effects/bookmark-remote.effects';
import { statsReducer } from './reducers/stats.reducer';
import { CoreSettingsEffects } from './effects/core-settings.effects';
import { StatsEffects } from './effects/stats.effects';

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
	BookmarkSyncEffects,
	BookmarkRemoteEffects,

	// Database
	DatabaseEffects,

	// Stats
	StatsEffects,

];

export const reducers: ActionReducerMap<AppState> = {

	core: combineReducers(coreReducer),
	stats: statsReducer,
	bookmark: combineReducers(bookmarkReducer)

};
