import { Action, createReducer, on } from '@ngrx/store';
import { quoteActions } from '@actions';
import { Quote_SettingsState, quote_initialSettingsState } from '@states';

const reducer = createReducer(

	quote_initialSettingsState,
	on(quoteActions.setSelectedId, (state, { id }): Quote_SettingsState => ({ ...state, selectedId: id }))

);

export function quote_SettingsReducer(state: Quote_SettingsState | undefined, action: Action): Quote_SettingsState {
	return reducer(state, action);
}
