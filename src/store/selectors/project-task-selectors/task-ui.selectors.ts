import { NameBase, Task, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selProject_selected, selProject_selectedId } from '../project-selectors/project-ui.selectors';
import { selTask_array, selTask_entities } from './task-entities.selectors';
import { selTask_UIState } from './task.selectors';

const selTask_selectedId = createSelector(

	selTask_UIState,
	state => state.selectedId

);

export const selTask_selected = createSelector(

	selTask_entities,
	selTask_selectedId,
	(entities, selectedId) => selectedId ? entities[selectedId] : null

);

const selTask_taskGroupId = createSelector(

	selTask_UIState,
	state => state.taskGroupId

);

export const selTask_selectedTaskGroup = createSelector(

	selProject_selected,
	selTask_taskGroupId,
	(project, taskGroupId): NameBase | null => {

		if (project && taskGroupId)
			return project.taskGroups.find(tg => tg.id === taskGroupId) ?? null;
		return null;

	}

);

export const selTask_taskGroupMap = createSelector(

	selProject_selectedId,
	selTask_array,
	(projectId, tasks): Record<UUID, Task[]> => { // return Record<TaskGroupId, Task[]>

		return tasks
			.filter(t => t.project.id === projectId)
			.reduce(

				(rec, t) => {

					const tgTasks = rec[t.taskGroup.id];
					if (tgTasks)
						tgTasks.push(t);
					else
						rec[t.taskGroup.id] = [t];
					return rec;

				},
				{} as Record<UUID, Task[]>

			);

	}


);
