import { sessionActions } from '@actions/session.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { session_initialUIState, Session_UIState } from '@states/session.state';

const reducer = createReducer(

	session_initialUIState,
	on(sessionActions.setSelectedId, (state, { id }): Session_UIState => ({ ...state, selectedId: id }))

);

export function session_UIReducer(state: Session_UIState | undefined, action: Action): Session_UIState {
	return reducer(state, action);
}
