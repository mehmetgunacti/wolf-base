import { Action, createReducer, on } from '@ngrx/store';
import { setQueryParams, setSelectedId } from 'store/actions/project.actions';
import { initialProjectUIState, Project_UIState } from 'store/states/project.state';

const reducer = createReducer(

	initialProjectUIState,
	on(setQueryParams, (state, { search }): Project_UIState => ({ ...state, queryParams: { search } })),
	on(setSelectedId, (state, { id }): Project_UIState => ({ ...state, selectedId: id }))

);

export function project_UIReducer(state: Project_UIState | undefined, action: Action): Project_UIState {
	return reducer(state, action);
}
