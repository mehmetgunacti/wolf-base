import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { initialTaskUIState, Task_UIState } from 'store/states/project-task.state';
import * as actions from 'store/actions/project-task.actions';

const reducer = createReducer(

	initialTaskUIState,
	on(actions.openTaskDialog, (state, { id }): Task_UIState => {

		return produce(
			state,
			draft => {
				draft.selectedId = id;
			}
		);

	}),
	on(actions.openAddTaskDialog, (state, { taskGroupId }): Task_UIState => ({

		...state,
		selectedId: null,
		taskGroupId

	})),
	// on(actions.openEditTaskDialog, (state, { id }): Task_UIState => ({ ...state, selectedId: id })),
	on(actions.closeEditDialog, (state): Task_UIState => ({ ...state, selectedId: null, taskGroupId: null })),

);

export function task_UIReducer(state: Task_UIState | undefined, action: Action): Task_UIState {
	return reducer(state, action);
}
