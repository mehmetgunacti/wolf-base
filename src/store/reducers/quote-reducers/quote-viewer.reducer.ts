import { Action, createReducer, on } from '@ngrx/store';
import { changeQuote, setRunning } from 'store/actions/quote.actions';
import { quote_initialViewerState, Quote_ViewerState } from 'store/states/quote.state';

const reducer = createReducer(

	quote_initialViewerState,
	on(changeQuote, (state, { id }): Quote_ViewerState => ({ ...state, selectedId: id })),
	on(setRunning, (state, { running }): Quote_ViewerState => ({ ...state, running }))

);

export function quote_ViewerReducer(state: Quote_ViewerState | undefined, action: Action): Quote_ViewerState {
	return reducer(state, action);
}
