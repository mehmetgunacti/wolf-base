import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import {
	setBigScreen
} from '../actions/ui.action';
import { UIState, initialUIState } from '../states/ui.state';

export const uiReducer: ActionReducer<UIState, Action> = createReducer(

	initialUIState,
	on(setBigScreen, (state, { isBigScreen }) => {

		return produce(
			state,
			draft => { draft.bigScreen = isBigScreen }
		);

	})

);
