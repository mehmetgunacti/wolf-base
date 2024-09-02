import { createSelector } from '@ngrx/store';
import { selEntityMap } from './quote-entity.selectors';
import { selQuote_SettingsState } from './quote.selectors';

const selQuoteSettings_selectedId = createSelector(

	selQuote_SettingsState,
	state => state.selectedId

);

export const selQuoteSettings_selected = createSelector(

	selEntityMap,
	selQuoteSettings_selectedId,
	(entities, selectedId) => selectedId ? entities[selectedId] : null

);
