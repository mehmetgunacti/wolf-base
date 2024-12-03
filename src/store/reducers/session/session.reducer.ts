import { ActionReducerMap } from '@ngrx/store';
import { Session_ModuleState } from '@states/session.state';
import { session_UIReducer } from './session-ui.reducer';

export const sessionReducer: ActionReducerMap<Session_ModuleState> = {

	ui: session_UIReducer

};
