import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { setBigScreen } from 'store/actions/core-ui.actions';
import { CoreUIState, initialCoreUIState } from 'store/states/core.state';

export const coreUiReducer: ActionReducer<CoreUIState, Action> = createReducer(

	initialCoreUIState,
	on(setBigScreen, (state, { isBigScreen }) => {

		return produce(
			state,
			draft => { draft.bigScreen = isBigScreen }
		);

	})

);
