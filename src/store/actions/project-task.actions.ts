import { UUID } from '@constants/common.constant';
import { TaskCategory, TaskState } from '@constants/project.constant';
import { TaskQueryParams } from '@models/project.model';
import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const taskActions = createActionGroup({

	source: 'Task',
	events: {

		// UI
		setSelectedId		: props<{ id: UUID | null }>(),

		clickTag			: props<{ name: string }>(),
		setSelectedTags		: props<{ tags: string[] }>(),
		resetQueryParams	: emptyProps(),
		search				: props<{ term: string | null }>(),
		setQueryParams		: props<TaskQueryParams>(),
		taskStatusChange	: props<{ status: TaskState }>(),
		taskCategoryChange	: props<{ category: TaskCategory | string }>(),

		openAddTaskDialog	: emptyProps(),
		openEditTaskDialog	: props<{ id: UUID }>(),
		closeEditDialog		: emptyProps()

	}

});
