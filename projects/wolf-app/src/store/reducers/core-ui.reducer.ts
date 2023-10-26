import { DEFAULT_CONF_VALUES } from '@lib';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { navigateSuccess } from 'store/actions/core-navigation.actions';
import { setBigScreen } from 'store/actions/core-ui.actions';
import { confChanged } from 'store/actions/core.actions';
import { CoreUIState, initialCoreUIState } from 'store/states/core.state';

export const coreUiReducer: ActionReducer<CoreUIState, Action> = createReducer(

	initialCoreUIState,
	on(confChanged, (state, { configuration }) => ({

		...state,
		sidebarVisible: configuration.sidebarVisible ?? DEFAULT_CONF_VALUES.sidebarVisible,
		theme: configuration.theme ?? DEFAULT_CONF_VALUES.theme

	})),
	on(setBigScreen, (state, { isBigScreen }) => {

		return produce(
			state,
			draft => { draft.bigScreen = isBigScreen }
		);

	}),
	on(navigateSuccess, state => ({ ...state, sidebarVisible: false }))

);
