import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import {
	themeSet,
	setBigScreen
} from '../actions/ui.action';
import { initialUIState, UIState } from '../states/ui.state';
import * as utils from 'utils';

export const uiReducer: ActionReducer<UIState, Action> = createReducer(

	initialUIState,
	on(themeSet, (state, params) => {

		return produce(
			state,
			draft => new utils.ThemeHandler(state, draft).setNewTheme(params['newTheme'])
		);

	}),

	on(setBigScreen, (state, { isBigScreen }) => {

		return produce(
			state,
			draft => { draft.bigScreen = isBigScreen }
		);

	})

);
