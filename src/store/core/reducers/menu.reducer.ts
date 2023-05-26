import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { setSelectedBookmarksCount, setTotalBookmarksCount } from '../actions';
import { MenuState, initialMenuState } from '../states';

export const menuReducer: ActionReducer<MenuState, Action> = createReducer(

	initialMenuState,
	on(setTotalBookmarksCount, (state, params) => {

		return produce(
			state,
			draft => { draft.totalBookmarksCount = params.count }
		);

	}),

	on(setSelectedBookmarksCount, (state, params) => {

		return produce(
			state,
			draft => { draft.selectedBookmarksCount = params.count }
		);

	}),

);
