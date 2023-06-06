import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import * as fromBookmark from './bookmark';
import * as fromCore from './core';
import * as fromSync from './sync';
import { AppState } from './app.state';

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
	fromCore.ConfEffects,
	fromCore.NotificationEffects,
	fromCore.NavigationEffects,
	fromCore.UIEffects,
	fromCore.ThemeEffects,

	// Bookmarks
	fromBookmark.EntitiesEffects,

	// Sync
	fromSync.SyncEffects

];

export const reducers: ActionReducerMap<AppState> = {

	core: combineReducers(fromCore.coreReducer),
	sync: fromSync.syncReducer,
	bookmark: combineReducers(fromBookmark.bookmarkReducer)

};
