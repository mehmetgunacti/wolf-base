import { Action, createReducer, on } from '@ngrx/store';
import { setQueryParams } from 'store/actions/word.actions';
import { Word_UIState, initialWordUIState } from 'store/states/word.state';

const reducer = createReducer(

	initialWordUIState,
	on(setQueryParams, (state, { search }): Word_UIState => ({ ...state, queryParams: { search } })),

);

export function word_UIReducer(state: Word_UIState | undefined, action: Action): Word_UIState {
	return reducer(state, action);
}
