import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkActions } from 'store/actions';
import * as fromStates from '../states';

const reducer = createReducer(

	fromStates.tagsInitialState,

	on(BookmarkActions.Tags.search, (state, { term }): fromStates.TagsState => ({ ...state, searchTerm: term })),
	on(BookmarkActions.Tags.setSelectedTags, (state, { tags }): fromStates.TagsState => ({ ...state, selectedTags: tags })),

);

export function tagsReducer(state: fromStates.TagsState | undefined, action: Action): fromStates.TagsState {
	return reducer(state, action);
}
