import { TaskCategory, TaskQueryParams, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';
import { TaskState } from 'zone.js/lib/zone-impl';

// UI
export const setSelectedId					= createAction('[Task] Set Selected Id', props<{ id: UUID | null }>());

export const clickTag						= createAction('[Task] Click Tag', props<{ name: string }>());
export const setSelectedTags				= createAction('[Task] Set Selected Tags', props<{ tags: string[] }>());
export const resetQueryParams				= createAction('[Task] Reset Query Params');
export const search							= createAction('[Task] Search', props<{ term: string | null }>());
export const setQueryParams					= createAction('[Task] Set Query State', props<TaskQueryParams>());
export const taskStatusChange				= createAction('[Task] Task Status Change', props<{ status: TaskState }>());
export const taskCategoryChange				= createAction('[Task] Task Category Change', props<{ category: TaskCategory | string }>());

export const openAddTaskDialog				= createAction('[Task] Open New Task Dialog');
export const openEditTaskDialog				= createAction('[Task] Open Edit Dialog', props<{ id: UUID }>());
export const closeEditDialog				= createAction('[Task] Close Edit Dialog');
