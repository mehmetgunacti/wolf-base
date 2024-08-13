import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as actions from 'store/actions/project-task.actions';
import { initialTaskUIState, Task_UIState } from 'store/states/project-task.state';

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
	on(actions.openAddTaskDialog, (state): Task_UIState => ({ ...state, selectedId: null })),
	on(actions.closeEditDialog, (state): Task_UIState => ({ ...state, selectedId: null })),

);

export function task_UIReducer(state: Task_UIState | undefined, action: Action): Task_UIState {
	return reducer(state, action);
}
