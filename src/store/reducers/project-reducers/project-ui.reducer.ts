import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { setQueryParams, setSelectedId } from 'store/actions/project.actions';
import { initialProjectUIState, Project_UIState } from 'store/states/project.state';

const reducer = createReducer(

	initialProjectUIState,
	on(setQueryParams, (state, { search }): Project_UIState => ({ ...state, queryParams: { search } })),
	on(setSelectedId, (state, { id }): Project_UIState => {

		return produce(
			state,
			draft => {
				draft.selectedId = id;
			}
		);

	})

	// on(projectActions.openEditProjectDialogSuccess, (state, { id }): ProjectUIState => ({ ...state, editDialogOverlayId: id })),
	// on(projectActions.closeEditProjectDialogSuccess, (state): ProjectUIState => ({ ...state, editDialogOverlayId: null })),
	// on(fromClipboardFailure, (state, { shaking }): ProjectUIState => ({ ...state, shaking })),
	// on(createProjectSuccess, (state): ProjectUIState => ({ ...state, editDialogVisible: false })),
	// on(updateProjectSuccess, (state): ProjectUIState => ({ ...state, editDialogVisible: false })),
	// on(deleteProjectSuccess, (state): ProjectUIState => ({ ...state, editDialogVisible: false }))

);

export function project_UIReducer(state: Project_UIState | undefined, action: Action): Project_UIState {
	return reducer(state, action);
}
