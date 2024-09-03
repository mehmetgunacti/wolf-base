import { Action, createReducer, on } from '@ngrx/store';
import { changeQuote, disableAnimation, setRunning } from 'store/actions/quote.actions';
import { quote_initialViewerState, Quote_ViewerState } from 'store/states/quote.state';

const reducer = createReducer(

	quote_initialViewerState,
	on(changeQuote, (state, { id }): Quote_ViewerState => ({ ...state, selectedId: id, animate: true })),
	on(setRunning, (state, { running }): Quote_ViewerState => ({ ...state, running })),
	on(disableAnimation, (state): Quote_ViewerState => ({ ...state, animate: false })),

);

export function quote_ViewerReducer(state: Quote_ViewerState | undefined, action: Action): Quote_ViewerState {
	return reducer(state, action);
}
