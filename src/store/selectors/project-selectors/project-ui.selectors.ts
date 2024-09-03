import { Project } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_filteredTasks } from '../task-selectors/task-ui.selectors';
import { selEntityList, selEntityMap } from './project-entity.selectors';
import { selProject_UIState } from './project.selectors';

// SELECTED ID
const selProject_SelectedId = createSelector(

	selProject_UIState,
	state => state.selectedId

);

export const selProject_selected = createSelector(

	selEntityMap,
	selProject_SelectedId,
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

	selEntityList,
	selProject_search,
	(arr, search) => search !== null ? arr.filter(word => word.name.toLocaleLowerCase().includes(search.toLowerCase())) : arr

);
