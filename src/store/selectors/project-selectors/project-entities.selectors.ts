import { Project } from '@lib';
import { createSelector } from '@ngrx/store';
import { selProject_EntitiesState, selProject_UIState } from './project.selectors';

export const selProject_entities = createSelector(

	selProject_EntitiesState,
	entities => entities.entities

);

export const selProject_ids = createSelector(

	selProject_EntitiesState,
	state => Object.keys(state.entities)

);

export const selProject_array = createSelector(

	selProject_EntitiesState,
	(state): Project[] => Object.values(state.entities)

);

export const selProjects_count = createSelector(

	selProject_ids,
	ids => ids.length

);

export const selProject_search = createSelector(

	selProject_UIState,
	state => state.queryParams.search

);

export const selProject_filtered = createSelector(

	selProject_array,
	selProject_search,
	(arr, search) => search !== null ? arr.filter(word => word.name.toLocaleLowerCase().includes(search.toLowerCase())) : arr

);

const selProject_selectedId = createSelector(

	selProject_UIState,
	state => state.selectedId

);

export const selProject_selected = createSelector(

	selProject_entities,
	selProject_selectedId,
	(entities, selectedId) => selectedId ? entities[selectedId] : null

);
