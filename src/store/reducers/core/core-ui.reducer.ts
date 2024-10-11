import { DEFAULT_CONF_VALUES } from '@lib';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as utils from 'lib/utils';
import { coreActions } from 'store/actions';
import { CoreUIState, initialCoreUIState } from 'store/states/core.state';

export const coreUiReducer: ActionReducer<CoreUIState, Action> = createReducer(

	initialCoreUIState,
	on(coreActions.loadAllSuccess, (state, { configuration }) => ({

		...state,
		sidebarState: utils.evaluate(configuration.sidebarState ?? DEFAULT_CONF_VALUES.sidebarState, state.bigScreen),
		theme: configuration.theme ?? DEFAULT_CONF_VALUES.theme,
		quotesRunning: configuration.quotesRunning ?? DEFAULT_CONF_VALUES.quotesRunning

	})),
	on(coreActions.setBigScreen, (state, { bigScreen: isBigScreen }) => ({

		...state,
		bigScreen: isBigScreen,
		sidebarState: utils.afterResize(state.sidebarState, isBigScreen)

	})),
	on(coreActions.setNextSidebarState, (state): CoreUIState => ({

		...state,
		sidebarState: utils.nextState(state.sidebarState, state.bigScreen)

	})),
	on(coreActions.hideSidebar, (state): CoreUIState => ({

		...state,
		sidebarState: utils.hideSidebar(state.bigScreen)

	})),
	on(coreActions.setTheme, (state, { theme }): CoreUIState => ({ ...state, theme })),
	on(coreActions.setNow, (state): CoreUIState => ({ ...state, now: Date.now() }))

);
