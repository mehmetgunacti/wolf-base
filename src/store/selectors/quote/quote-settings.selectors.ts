import { createSelector } from '@ngrx/store';
import { selQuote_EntityMap } from '../entity/entity-quote.selectors';
import { selQuote_SettingsState } from './quote.selectors';

const selQuoteSettings_selectedId = createSelector(

	selQuote_SettingsState,
	state => state.selectedId

);

export const selQuoteSettings_selected = createSelector(

	selQuote_EntityMap,
	selQuoteSettings_selectedId,
	(entities, selectedId) => selectedId ? entities[selectedId] : null

);
