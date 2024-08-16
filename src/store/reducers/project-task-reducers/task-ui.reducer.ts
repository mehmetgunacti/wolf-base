import { Action, createReducer, on } from '@ngrx/store';
import * as actions from 'store/actions/project-task.actions';
import { initialTaskUIState, Task_UIState } from 'store/states/project-task.state';

const reducer = createReducer(

	initialTaskUIState,
	on(actions.openAddTaskDialog, (state): Task_UIState => ({ ...state, selectedId: null })),
	on(actions.openEditTaskDialog, (state, { id }): Task_UIState => ({ ...state, selectedId: id })),
	on(actions.closeEditDialog, (state): Task_UIState => ({ ...state, selectedId: null })),

);

export function task_UIReducer(state: Task_UIState | undefined, action: Action): Task_UIState {
	return reducer(state, action);
}
