import { UUID, Word } from '@lib';
import { createSelector } from '@ngrx/store';
import { selWord_EntitiesState } from '../entity-selectors/entity.selectors';
import { selWord_UIState } from './word.selectors';

export const selWord_entities = createSelector(

	selWord_EntitiesState,
	(entities): Record<UUID, Word> => entities.entities as Record<UUID, Word>

);

export const selWord_array = createSelector(

	selWord_entities,
	(entities): Word[] => Object.values(entities)

);

export const selWord_search = createSelector(

	selWord_UIState,
	state => state.queryParams.search

);

export const selWord_filtered = createSelector(

	selWord_array,
	selWord_search,
	(arr, search) => search !== null ? arr.filter(word => word.name.toLocaleLowerCase().includes(search.toLowerCase())) : arr

);

const selWord_selectedId = createSelector(

	selWord_UIState,
	state => state.selectedId

);

export const selWord_selected = createSelector(

	selWord_entities,
	selWord_selectedId,
	(entities, selectedId) => selectedId ? entities[selectedId] : null

);
