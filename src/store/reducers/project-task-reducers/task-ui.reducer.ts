import { Action, createReducer, on } from '@ngrx/store';
import * as actions from 'store/actions/project-task.actions';
import { initialTaskUIState, Task_UIState } from 'store/states/project-task.state';

const reducer = createReducer(

	initialTaskUIState,
	on(actions.setQueryParams, (state, { search, status, category, tags }): Task_UIState => ({ ...state, queryParams: { search, status, category, tags } })),

);

export function task_UIReducer(state: Task_UIState | undefined, action: Action): Task_UIState {
	return reducer(state, action);
}
