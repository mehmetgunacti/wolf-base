import { Action, createReducer, on } from '@ngrx/store';
import { setSelectedId } from 'store/actions/quote.actions';
import { Quote_SettingsState, quote_initialSettingsState } from 'store/states/quote.state';

const reducer = createReducer(

	quote_initialSettingsState,
	on(setSelectedId, (state, { id }): Quote_SettingsState => ({ ...state, selectedId: id }))

);

export function quote_SettingsReducer(state: Quote_SettingsState | undefined, action: Action): Quote_SettingsState {
	return reducer(state, action);
}
