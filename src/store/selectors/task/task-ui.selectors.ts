import { TaskPriority, TaskState } from '@constants/project.constant';
import { Task, TaskQueryParams } from '@models/project.model';
import { createSelector } from '@ngrx/store';
import { selTask_EntityList, selTask_EntityMap } from '../entity/entity-task.selectors';
import { selTask_UIState } from './task.selectors';

// SELECTED ID
export const selTask_editEntity = createSelector(

	selTask_EntityMap,
	selTask_UIState,
	(entities, uiState) => uiState.editId ? entities[ uiState.editId ] : null

);

export const selTask_formVisible = createSelector(

	selTask_UIState,
	state => state.formVisible

);

export const selTask_queryParams = createSelector(

	selTask_UIState,
	state => state.queryParams

);

function sortTasks(tasks: Task[]): Task[] {

	const statusOrder = [ TaskState.ongoing, TaskState.paused, TaskState.completed, TaskState.abandoned ];
	const priorityOrder = [ TaskPriority.high, TaskPriority.medium, TaskPriority.low ];

	return tasks.sort((a, b) => {

		// Sort by status
		const statusComparison = statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status);
		if (statusComparison !== 0)
			return statusComparison;

		// Sort by priority if status is the same
		const priorityComparison = priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
		if (priorityComparison !== 0)
			return priorityComparison;

		// Sort by start date if both status and priority are the same
		return new Date(a.start).getTime() - new Date(b.start).getTime();

	});

}

function filterTasks(params: TaskQueryParams, tasks: Task[]): Task[] {

	let entities = tasks;

	// filter by status
	if (params.status !== 'all')
		entities = entities.filter(e => e.status === params.status);

	// filter by category
	if (params.category !== 'all')
		entities = entities.filter(e => e.category === params.category);

	// filter by tags
	const filteredEntities: Task[] =
		params.tags.reduce(

			(acc, tag) => { return acc.filter(e => e.tags.includes(tag)); },
			entities

		);

	if (!params.search)
		return filteredEntities;

	// Split the search term into an array of individual words
	const searchWords = params.search.toLowerCase().split(' ');

	// filter by search term
	const result = filteredEntities.filter(task => {

		const { name, description, tags } = task;
		const lowerCaseName = name.toLowerCase();
		const lowerCaseDescription = description?.toLowerCase() ?? '';

		// Check if any of the search words is present in entity properties
		return searchWords.every(
			word => lowerCaseName.includes(word) || lowerCaseDescription.includes(word) || tags.some(tag => tag.includes(word))
		);

	});

	return result;

}

export const selTask_filteredTasks = createSelector(

	selTask_EntityList,
	selTask_queryParams,
	(tasks, params): Task[] => sortTasks(filterTasks(params, tasks))

);
