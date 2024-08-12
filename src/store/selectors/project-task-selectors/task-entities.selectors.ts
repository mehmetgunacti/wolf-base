import { Task } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_EntitiesState } from './task.selectors';

export const selTask_entities = createSelector(

	selTask_EntitiesState,
	entities => entities.entities

);

export const selTask_ids = createSelector(

	selTask_EntitiesState,
	state => Object.keys(state.entities)

);

export const selTask_array = createSelector(

	selTask_EntitiesState,
	(state): Task[] => Object.values(state.entities)

);

export const selTasks_count = createSelector(

	selTask_ids,
	ids => ids.length

);
