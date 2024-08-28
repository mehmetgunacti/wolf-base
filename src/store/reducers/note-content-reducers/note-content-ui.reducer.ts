import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as contentActions from 'store/actions/note-content.actions';
import * as noteActions from 'store/actions/note.actions';
import { noteContent_initialUIState, NoteContent_UIState } from 'store/states/note-content.state';


const reducer = createReducer(

	noteContent_initialUIState,
	on(noteActions.setSelectedId, (state, { id }): NoteContent_UIState => {

		return produce(
			state,
			draft => {
				if (!id)
					draft.content = null;
			}
		);

	}),
	on(contentActions.loadOneContentSuccess, (state, { content }): NoteContent_UIState => ({ ...state, content }))

);

export function noteContent_UIReducer(state: NoteContent_UIState | undefined, action: Action): NoteContent_UIState {
	return reducer(state, action);
}
