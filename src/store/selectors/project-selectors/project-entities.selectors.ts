import { Project } from '@lib';
import { createSelector } from '@ngrx/store';
import { selProject_EntitiesState } from './project.selectors';

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
