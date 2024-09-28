import { TaskCategory, TaskQueryParams, UUID } from '@lib';
import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { TaskState } from 'zone.js/lib/zone-impl';

export const taskActions = createActionGroup({

	source: 'Task',
	events: {

		// UI
		'Set Selected Id'					: props<{ id: UUID | null }>(),

		'Click Tag'						: props<{ name: string }>(),
		'Set Selected Tags'				: props<{ tags: string[] }>(),
		'Reset Query Params'			: emptyProps(),
		'Search'						: props<{ term: string | null }>(),
		'Set Query Params'				: props<TaskQueryParams>(),
		'Task Status Change'			: props<{ status: TaskState }>(),
		'Task Category Change'			: props<{ category: TaskCategory | string }>(),

		'Open Add Task Dialog'				: emptyProps(),
		'Open Edit Task Dialog'				: props<{ id: UUID }>(),
		'Close Edit Dialog'					: emptyProps()

	}

});
