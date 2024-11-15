import { UUID } from '@constants/common.constant';
import { TaskState } from '@constants/project.constant';
import { TaskQueryParams } from '@models/project.model';

export interface Task_ModuleState {

	ui: Task_UIState;

}

export interface Task_UIState {

	selectedId: UUID | null;
	queryParams: TaskQueryParams;

}

// INITIALIZATION

export const initialTaskUIState: Task_UIState = {

	selectedId: null,
	queryParams: {

		search: null,
		status: TaskState.ongoing,
		category: 'all',
		tags: []

	},

};

export const initialTaskState: Task_ModuleState = {

	ui: initialTaskUIState

};
