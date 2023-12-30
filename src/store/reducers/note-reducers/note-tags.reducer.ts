import { Action, createReducer, on } from '@ngrx/store';
import { search, setSelectedTags } from 'store/actions/note.actions';
import { NoteTagsState, initialNoteTagsState } from 'store/states/note.state';

const reducer = createReducer(

	initialNoteTagsState,

	on(search, (state, { term }): NoteTagsState => ({ ...state, searchTerm: term })),
	on(setSelectedTags, (state, { tags }): NoteTagsState => ({ ...state, selectedTags: tags })),

);

export function noteTagsReducer(state: NoteTagsState | undefined, action: Action): NoteTagsState {
	return reducer(state, action);
}
