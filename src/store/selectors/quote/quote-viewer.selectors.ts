import { createSelector } from '@ngrx/store';
import { Quote_ViewerState } from '@states';
import { selQuote_EntityMap } from '../entity/entity-quote.selectors';
import { selQuote_ViewerState } from './quote.selectors';

// SELECTED ID
const selQuote_SelectedId = createSelector(

	selQuote_ViewerState,
	state => state.selectedId

);

export const selQuote_SelectedEntity = createSelector(

	selQuote_EntityMap,
	selQuote_SelectedId,
	(map, id) => id ? map[ id ] : null

);

export const selQuoteViewer_running = createSelector(

	selQuote_ViewerState,
	(state: Quote_ViewerState) => state.running

);

export const selQuoteViewer_animate = createSelector(

	selQuote_ViewerState,
	(state: Quote_ViewerState) => state.animate

);
