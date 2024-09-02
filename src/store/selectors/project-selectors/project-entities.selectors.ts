import { Project, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selProject_EntitiesState } from '../entity-selectors/entity.selectors';

export const selProject_entities = createSelector(

	selProject_EntitiesState,
	(entities): Record<UUID, Project> => entities.entities as Record<UUID, Project>

);

export const selProject_ids = createSelector(

	selProject_EntitiesState,
	state => Object.keys(state.entities)

);

export const selProject_array = createSelector(

	selProject_entities,
	(state): Project[] => Object.values(state)

);

export const selProjects_count = createSelector(

	selProject_ids,
	ids => ids.length

);
