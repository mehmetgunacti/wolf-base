import { Project } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_filteredTasks } from '../project-task-selectors/task-tags.selectors';
import { selProject_array, selProject_entities } from './project-entities.selectors';
import { selProject_UIState } from './project.selectors';

export const selProject_selectedId = createSelector(

	selProject_UIState,
	state => state.selectedId

);

export const selProject_selected = createSelector(

	selProject_entities,
	selProject_selectedId,
	selTask_filteredTasks,
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

const selProject_queryParams = createSelector(

	selProject_UIState,
	state => state.queryParams

);

export const selProject_search = createSelector(

	selProject_queryParams,
	params => params.search

);

export const selProject_filtered = createSelector(

	selProject_array,
	selProject_search,
	(arr, search) => search !== null ? arr.filter(word => word.name.toLocaleLowerCase().includes(search.toLowerCase())) : arr

);
