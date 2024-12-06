import { sessionActions } from '@actions/session.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { session_initialUIState, Session_UIState } from '@states/session.state';

const reducer = createReducer(

	session_initialUIState,
	on(sessionActions.openDialog, (state, { id }): Session_UIState => ({ ...state, examId: id, dialogVisible: true })),
	on(sessionActions.closeDialog, (state): Session_UIState => ({ ...state, examId: null, dialogVisible: false })),

);

export function session_UIReducer(state: Session_UIState | undefined, action: Action): Session_UIState {
	return reducer(state, action);
}
