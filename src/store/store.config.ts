import { Action, ActionReducer, ActionReducerMap, MetaReducer } from '@ngrx/store';
import * as fromEffects from 'store/effects';
import * as fromReducers from 'store/reducers';
import * as fromStates from 'store/states';

export function clearState(reducer: ActionReducer<fromStates.AppState>): ActionReducer<fromStates.AppState> {

	return function (state: fromStates.AppState | undefined, action: Action) {

		// code here
		return reducer(state, action);

	};

}

export const metaReducers: MetaReducer<fromStates.AppState>[] = [

	clearState

];

export const effects = [

	fromEffects.CommonEffects,
	fromEffects.NotificationEffects,
	fromEffects.NavigationEffects,
	fromEffects.UIEffects

];

export const reducers: ActionReducerMap<fromStates.AppState> = {

	ui: fromReducers.uiReducer

};
