import { DEFAULT_CONF_VALUES } from '@lib';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { setBigScreen, setNow, setSidebarState, setTheme } from 'store/actions/core-ui.actions';
import { loadAllSuccess } from 'store/actions/core.actions';
import { CoreUIState, initialCoreUIState } from 'store/states/core.state';

export const coreUiReducer: ActionReducer<CoreUIState, Action> = createReducer(

	initialCoreUIState,
	on(loadAllSuccess, (state, { configuration }) => ({

		...state,
		sidebarState: configuration.sidebarState ?? DEFAULT_CONF_VALUES.sidebarState,
		theme: configuration.theme ?? DEFAULT_CONF_VALUES.theme,
		quotesRunning: configuration.quotesRunning ?? DEFAULT_CONF_VALUES.quotesRunning

	})),
	on(setBigScreen, (state, { isBigScreen }) => {

		return produce(
			state,
			draft => { draft.bigScreen = isBigScreen }
		);

	}),
	on(setSidebarState, (state, { sidebarState }): CoreUIState => ({ ...state, sidebarState })),
	on(setTheme, (state, { theme }): CoreUIState => ({ ...state, theme })),
	on(setNow, (state): CoreUIState => ({ ...state, now: Date.now() }))

);
