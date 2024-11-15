import { quoteActions } from '@actions/quote.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { quote_initialViewerState, Quote_ViewerState } from '@states/quote.state';

const reducer = createReducer(

	quote_initialViewerState,
	on(quoteActions.changeQuote, (state, { id }): Quote_ViewerState => ({ ...state, selectedId: id, animate: true })),
	on(quoteActions.setRunning, (state, { running }): Quote_ViewerState => ({ ...state, running })),
	on(quoteActions.disableAnimation, (state): Quote_ViewerState => ({ ...state, animate: false })),

);

export function quote_ViewerReducer(state: Quote_ViewerState | undefined, action: Action): Quote_ViewerState {
	return reducer(state, action);
}
