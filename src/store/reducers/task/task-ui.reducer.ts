import { taskActions } from '@actions/project-task.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { initialTaskUIState, Task_UIState } from '@states/task.state';

const reducer = createReducer(

	initialTaskUIState,
	on(taskActions.setQueryParams, (state, { search, status, category, tags }): Task_UIState => ({ ...state, queryParams: { search, status, category, tags } })),
	on(taskActions.openAddTaskDialog, (state): Task_UIState => ({ ...state, editId: null, formVisible: true })),
	on(taskActions.closeEditDialog, (state): Task_UIState => ({ ...state, editId: null, formVisible: false })),
	on(taskActions.openEditTaskDialog, (state, { id }): Task_UIState => ({ ...state, editId: id, formVisible: true }))

);

export function task_UIReducer(state: Task_UIState | undefined, action: Action): Task_UIState {
	return reducer(state, action);
}
