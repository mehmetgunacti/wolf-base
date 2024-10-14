import { Action, createReducer, on } from '@ngrx/store';
import { taskActions } from '@actions';
import { initialTaskUIState, Task_UIState } from '@states';

const reducer = createReducer(

	initialTaskUIState,
	on(taskActions.setQueryParams, (state, { search, status, category, tags }): Task_UIState => ({ ...state, queryParams: { search, status, category, tags } })),
	on(taskActions.openAddTaskDialog, (state): Task_UIState => ({ ...state, selectedId: null })),
	on(taskActions.closeEditDialog, (state): Task_UIState => ({ ...state, selectedId: null })),
	on(taskActions.openEditTaskDialog, (state, { id }): Task_UIState => ({ ...state, selectedId: id }))

);

export function task_UIReducer(state: Task_UIState | undefined, action: Action): Task_UIState {
	return reducer(state, action);
}
