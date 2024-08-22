import { createSelector } from '@ngrx/store';
import { selQuote_entities } from './quote-entities.selectors';
import { selQuote_SettingsState } from './quote.selectors';

const selQuoteSettings_selectedId = createSelector(

	selQuote_SettingsState,
	state => state.selectedId

);

export const selQuoteSettings_selected = createSelector(

	selQuote_entities,
	selQuoteSettings_selectedId,
	(entities, selectedId) => selectedId ? entities[selectedId] : null

);
