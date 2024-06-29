import { Action, createReducer, on } from '@ngrx/store';
import { setSelectedId } from 'store/actions/quote.actions';
import { Quote_UIState, quote_initialUIState } from 'store/states/quote.state';

const reducer = createReducer(

	quote_initialUIState,
	on(setSelectedId, (state, { id }): Quote_UIState => ({ ...state, selectedId: id }))

);

export function quote_UIReducer(state: Quote_UIState | undefined, action: Action): Quote_UIState {
	return reducer(state, action);
}
