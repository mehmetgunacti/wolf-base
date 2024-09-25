import { DEFAULT_CONF_VALUES } from '@lib';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { setBigScreen, setNow, setSidebarAnimation, setTheme } from 'store/actions/core-ui.actions';
import { loadAllSuccess } from 'store/actions/core.actions';
import { CoreUIState, initialCoreUIState } from 'store/states/core.state';

export const coreUiReducer: ActionReducer<CoreUIState, Action> = createReducer(

	initialCoreUIState,
	on(loadAllSuccess, (state, { configuration }) => ({

		...state,
		sidebarState: configuration.sidebarAnimation ?? DEFAULT_CONF_VALUES.sidebarAnimation,
		theme: configuration.theme ?? DEFAULT_CONF_VALUES.theme,
		quotesRunning: configuration.quotesRunning ?? DEFAULT_CONF_VALUES.quotesRunning

	})),
	on(setBigScreen, (state, { isBigScreen }) => {

		if (state.bigScreen)
			return state;

		return produce(
			state,
			draft => { draft.bigScreen = isBigScreen }
		);

	}),
	on(setSidebarAnimation, (state, { animation }): CoreUIState => ({ ...state, sidebarAnimation: animation })),
	on(setTheme, (state, { theme }): CoreUIState => ({ ...state, theme })),
	on(setNow, (state): CoreUIState => ({ ...state, now: Date.now() }))

);
