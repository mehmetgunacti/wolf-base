import { Action, createReducer, on } from '@ngrx/store';
import { setQueryParams, setSelectedId } from 'store/actions/word.actions';
import { Word_UIState, initialWordUIState } from 'store/states/word.state';

const reducer = createReducer(

	initialWordUIState,
	on(setQueryParams, (state, { search }): Word_UIState => ({ ...state, queryParams: { search } })),
	on(setSelectedId, (state, { id }): Word_UIState => ({ ...state, selectedId: id }))

);

export function word_UIReducer(state: Word_UIState | undefined, action: Action): Word_UIState {
	return reducer(state, action);
}
