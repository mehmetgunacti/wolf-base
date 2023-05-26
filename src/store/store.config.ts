import { Action, ActionReducer, ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import * as fromBookmark from './bookmark';
import * as fromCore from './core';
import { AppState } from './app.state';

export function clearState(reducer: ActionReducer<AppState>): ActionReducer<AppState> {

	return function (state: AppState | undefined, action: Action) {

		// code here
		return reducer(state, action);

	};

}

export const metaReducers: MetaReducer<AppState>[] = [

	clearState

];

export const effects = [

	fromCore.ConfEffects,
	fromCore.MenuEffects,
	fromCore.NotificationEffects,
	fromCore.NavigationEffects,
	fromCore.UIEffects,

	fromBookmark.EntitiesEffects

];

export const reducers: ActionReducerMap<AppState> = {

	core: combineReducers(fromCore.coreReducer),
	bookmark: combineReducers(fromBookmark.bookmarkReducer)

};
