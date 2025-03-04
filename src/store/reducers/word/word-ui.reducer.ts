import { wordActions } from '@actions/word.actions';
import { Action, createReducer, on } from '@ngrx/store';
import { word_initialUIState, Word_UIState } from '@states/word.state';

const reducer = createReducer(

	word_initialUIState,
	on(wordActions.setQueryParams, (state, { search }): Word_UIState => ({ ...state, queryParams: { search } })),
	on(wordActions.setSelectedId, (state, { id }): Word_UIState => ({ ...state, selectedId: id }))

);

export function word_UIReducer(state: Word_UIState | undefined, action: Action): Word_UIState {
	return reducer(state, action);
}
