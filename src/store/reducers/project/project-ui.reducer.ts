import { Action, createReducer, on } from '@ngrx/store';
import { projectActions } from '@actions';
import { initialProjectUIState, Project_UIState } from '@states';

const reducer = createReducer(

	initialProjectUIState,
	on(projectActions.setQueryParams, (state, { search }): Project_UIState => ({ ...state, queryParams: { search } })),
	on(projectActions.setSelectedId, (state, { id }): Project_UIState => ({ ...state, selectedId: id }))

);

export function project_UIReducer(state: Project_UIState | undefined, action: Action): Project_UIState {
	return reducer(state, action);
}
