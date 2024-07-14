import { createSelector } from '@ngrx/store';
import { selQuote_EntitiesState, selQuote_SettingsState } from './quote.selectors';

const selQuoteSettings_selectedId = createSelector(

	selQuote_SettingsState,
	state => state.selectedId

);

export const selQuoteSettings_selected = createSelector(

	selQuote_EntitiesState,
	selQuoteSettings_selectedId,
	(entities, selectedId) => selectedId ? entities.entities[selectedId] : null

);
