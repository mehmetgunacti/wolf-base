import { noteActions } from '@actions/note.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { note_initialUIState, Note_UIState } from '@states/note.state';
import { produce } from 'immer';

const reducer = createReducer(

	note_initialUIState,
	on(noteActions.setQueryParams, (state, { search, tags }): Note_UIState => ({ ...state, queryParams: { search, tags } })),
	on(noteActions.setSelectedId, (state, { id }): Note_UIState => {

		return produce(

			state,
			draft => {
				draft.selectedId = id;
				if (!id)
					draft.content = null;
			}

		);

	}),
	on(noteActions.loadOneContentSuccess, (state, { content }): Note_UIState => ({ ...state, content })),

);

export function note_UIReducer(state: Note_UIState | undefined, action: Action): Note_UIState {
	return reducer(state, action);
}
