import { createSelector } from '@ngrx/store';
import { Quote_ViewerState } from 'store/states/quote.state';
import { selQuote_ViewerState } from './quote.selectors';
import { selQuote_entities } from './quote-entities.selectors';

export const selQuoteViewer_running = createSelector(

	selQuote_ViewerState,
	(state: Quote_ViewerState) => state.running

);

const selQuoteViewer_selectedId = createSelector(

	selQuote_ViewerState,
	(state: Quote_ViewerState) => state.selectedId

);

export const selQuoteViewer_quote = createSelector(

	selQuote_entities,
	selQuoteViewer_selectedId,
	(entities, id) => id ? entities[id] ?? null : null

);
