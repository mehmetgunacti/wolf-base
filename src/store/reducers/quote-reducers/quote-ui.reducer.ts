import { Action, createReducer, on } from '@ngrx/store';
import { moveToTrashSuccess, setSelectedId } from 'store/actions/quote.actions';
import { createSuccess } from 'store/actions/quote.actions';
import { Quote_UIState, quote_initialUIState } from 'store/states/quote.state';

const reducer = createReducer(

	quote_initialUIState,
	on(setSelectedId, (state, { id }): Quote_UIState => ({ ...state, selectedId: id })),
	on(createSuccess, (state, { quote }): Quote_UIState => ({ ...state, selectedId: quote.id })),
	on(moveToTrashSuccess, (state): Quote_UIState => ({ ...state, selectedId: null }))

);

export function quote_UIReducer(state: Quote_UIState | undefined, action: Action): Quote_UIState {
	return reducer(state, action);
}
