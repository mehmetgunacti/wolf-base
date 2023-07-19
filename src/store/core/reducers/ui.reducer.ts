import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { UIState, initialUIState } from '../states/ui.state';
import { CoreActions } from 'store/actions';

export const uiReducer: ActionReducer<UIState, Action> = createReducer(

	initialUIState,
	on(CoreActions.UI.setBigScreen, (state, { isBigScreen }) => {

		return produce(
			state,
			draft => { draft.bigScreen = isBigScreen }
		);

	})

);
