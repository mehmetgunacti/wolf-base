import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Session_ModuleState } from '@states/session.state';

const selSession_ModuleState = createFeatureSelector<Session_ModuleState>('session');

export const selSession_UIState = createSelector(

	selSession_ModuleState,
	state => state.ui

);
