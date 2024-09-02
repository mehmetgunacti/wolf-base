import { createSelector } from '@ngrx/store';
import { Quote_ViewerState } from 'store/states/quote.state';
import { selQuote_ViewerState } from './quote.selectors';

export const selQuoteViewer_running = createSelector(

	selQuote_ViewerState,
	(state: Quote_ViewerState) => state.running

);

export const selQuoteViewer_animate = createSelector(

	selQuote_ViewerState,
	(state: Quote_ViewerState) => state.animate

);
