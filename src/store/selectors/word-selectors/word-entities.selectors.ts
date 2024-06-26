import { Word, TAG_PINNED, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selWord_EntitiesState } from './word.selectors';

export const selWord_entities = createSelector(

	selWord_EntitiesState,
	entities => entities.entities

);

export const selWord_ids = createSelector(

	selWord_EntitiesState,
	state => Object.keys(state.entities)

);

export const selWord_array = createSelector(

	selWord_EntitiesState,
	(state): Word[] => Object.values(state.entities)

);

export const selWords_count = createSelector(

	selWord_ids,
	ids => ids.length

);

export const selWord_selected = createSelector(

	selWord_EntitiesState,
	state => state.selectedId ? state.entities[state.selectedId] : null

);
