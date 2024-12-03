import { UUID } from '@constants/common.constant';
import { TaskState } from '@constants/project.constant';
import { TaskQueryParams } from '@models/project.model';

export interface Task_ModuleState {

	ui: Task_UIState;

}

export interface Task_UIState {

	editId: UUID | null;
	formVisible: boolean;
	queryParams: TaskQueryParams;

}

// INITIALIZATION

export const initialTaskUIState: Task_UIState = {

	editId: null,
	formVisible: false,
	queryParams: {

		search: null,
		status: TaskState.ongoing,
		category: 'all',
		tags: []

	},

};

export const task_initialState: Task_ModuleState = {

	ui: initialTaskUIState

};
