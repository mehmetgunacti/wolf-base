import { coreActions } from '@actions/core.actions';
import { DEFAULT_CONF_VALUES } from '@constants/database.constant';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CoreUIState, initialCoreUIState } from '@states/core.state';
import { afterResize, evaluate, hideSidebar, nextState } from '@utils/sidebar.util';

export const coreUiReducer: ActionReducer<CoreUIState, Action> = createReducer(

	initialCoreUIState,
	on(coreActions.loadAllSuccess, (state, { configuration }) => ({

		...state,
		sidebarState: evaluate(configuration.sidebarState ?? DEFAULT_CONF_VALUES.sidebarState, state.bigScreen),
		theme: configuration.theme ?? DEFAULT_CONF_VALUES.theme,
		quotesRunning: configuration.quotesRunning ?? DEFAULT_CONF_VALUES.quotesRunning

	})),
	on(coreActions.setBigScreen, (state, { bigScreen: isBigScreen }) => ({

		...state,
		bigScreen: isBigScreen,
		sidebarState: afterResize(state.sidebarState, isBigScreen)

	})),
	on(coreActions.setNextSidebarState, (state): CoreUIState => ({

		...state,
		sidebarState: nextState(state.sidebarState, state.bigScreen)

	})),
	on(coreActions.hideSidebar, (state): CoreUIState => ({

		...state,
		sidebarState: hideSidebar(state.bigScreen)

	})),
	on(coreActions.setTheme, (state, { theme }): CoreUIState => ({ ...state, theme })),
	on(coreActions.setNow, (state): CoreUIState => ({ ...state, now: Date.now() }))

);
