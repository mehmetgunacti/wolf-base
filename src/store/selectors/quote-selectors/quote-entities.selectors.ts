import { Quote, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selQuote_EntitiesState } from './quote.selectors';

export const selQuote_entities = createSelector(

	selQuote_EntitiesState,
	(entities): Record<UUID, Quote> => entities.entities as Record<UUID, Quote>

);

export const selQuote_ids = createSelector(

	selQuote_EntitiesState,
	state => Object.keys(state.entities)

);

export const selQuote_array = createSelector(

	selQuote_entities,
	(entities): Quote[] => Object.values(entities)

);

export const selQuotes_count = createSelector(

	selQuote_ids,
	ids => ids.length

);
