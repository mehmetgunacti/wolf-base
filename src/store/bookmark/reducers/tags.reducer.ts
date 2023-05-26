import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromStates from '../states';

const reducer = createReducer(

	fromStates.tagsInitialState,

	on(fromActions.search, (state, { term }): fromStates.TagsState => ({ ...state, searchTerm: term })),
	on(fromActions.setSelectedTags, (state, { tags }): fromStates.TagsState => ({ ...state, selectedTags: tags })),

);

export function tagsReducer(state: fromStates.TagsState | undefined, action: Action): fromStates.TagsState {
	return reducer(state, action);
}
