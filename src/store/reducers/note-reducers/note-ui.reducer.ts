import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as actions from 'store/actions/note.actions';
import { Note_UIState, initialNoteUIState } from 'store/states/note.state';

const reducer = createReducer(

	initialNoteUIState,
	on(actions.setQueryParams, (state, { search, tags }): Note_UIState => ({ ...state, queryParams: { search, tags } })),
	on(actions.setSelectedId, (state, { id }): Note_UIState => {

		return produce(

			state,
			draft => {
				draft.selectedId = id;
				if (!id)
					draft.content = null;
			}

		);

	}),
	on(actions.loadOneContentSuccess, (state, { content }): Note_UIState => ({ ...state, content })),

);

export function note_UIReducer(state: Note_UIState | undefined, action: Action): Note_UIState {
	return reducer(state, action);
}
