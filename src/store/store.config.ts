import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { BookmarkEntitiesEffects } from './effects/bookmark-entities.effects';
import { BookmarkSyncEffects } from './effects/bookmark-sync.effects';
import { CoreConfigurationEffects } from './effects/core-configuration.effects';
import { CoreNavigationEffects } from './effects/core-navigation.effects';
import { CoreNotificationEffects } from './effects/core-notification.effects';
import { CoreThemeEffects } from './effects/core-theme.effects';
import { CoreUIEffects } from './effects/core-ui.effects';
import { SyncEffects } from './effects/sync.effects';
import { bookmarkReducer } from './reducers/bookmark.reducer';
import { coreReducer } from './reducers/core.reducer';
import { syncReducer } from './reducers/sync.reducer';
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

export const effects = [

	// Core
	CoreConfigurationEffects,
	CoreNotificationEffects,
	CoreNavigationEffects,
	CoreUIEffects,
	CoreThemeEffects,

	// Bookmarks
	BookmarkEntitiesEffects,
	BookmarkSyncEffects,

	// Sync
	SyncEffects

];

export const reducers: ActionReducerMap<AppState> = {

	core: combineReducers(coreReducer),
	sync: syncReducer,
	bookmark: combineReducers(bookmarkReducer)

};
