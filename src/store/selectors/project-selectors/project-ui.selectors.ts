import { Project } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_array } from '../project-task-selectors/task-entities.selectors';
import { selProject_array, selProject_entities } from './project-entities.selectors';
import { selProject_UIState } from './project.selectors';

export const selProject_selectedId = createSelector(

	selProject_UIState,
	state => state.selectedId

);

export const selProject_selected = createSelector(

	selProject_entities,
	selProject_selectedId,
	selTask_array,
	(state, id, tasks): Project | null => {

		const project = id ? state[id] ?? null : null;
		if (project)
			return {
				...project,
				tasks: tasks.filter(t => t.project.id === id)
			};
		return project;

	}

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

export const selProject_infoVisible = createSelector(

	selProject_UIState,
	state => state.infoVisible

);
