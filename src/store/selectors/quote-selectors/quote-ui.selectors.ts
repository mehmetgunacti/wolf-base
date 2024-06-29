import { createSelector } from '@ngrx/store';
import { selQuote_EntitiesState, selQuote_UIState } from './quote.selectors';

const selQuote_selectedId = createSelector(

	selQuote_UIState,
	state => state.selectedId

);

export const selQuote_selected = createSelector(

	selQuote_EntitiesState,
	selQuote_selectedId,
	(entities, selectedId) => selectedId ? entities.entities[selectedId] : null

);
