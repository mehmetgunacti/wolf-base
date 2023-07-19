import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { CoreActions } from 'store/actions';
import { CoreUIState, initialCoreUIState } from 'store/states/core.state';

export const uiReducer: ActionReducer<CoreUIState, Action> = createReducer(

	initialCoreUIState,
	on(CoreActions.UI.setBigScreen, (state, { isBigScreen }) => {

		return produce(
			state,
			draft => { draft.bigScreen = isBigScreen }
		);

	})

);
