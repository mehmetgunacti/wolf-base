import { coreActions } from '@actions/core.actions';
import { databaseActions } from '@actions/database.actions';
import { DEFAULT_CONF_VALUES } from '@constants/database.constant';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CoreUIState, core_initialUIState } from '@states/core.state';
import { getNextTheme } from '@utils/enum.util';
import { afterResize, evaluate, hideSidebar, nextState } from '@utils/sidebar.util';

function incProgressCounter(curr: number): number {

	return curr + 1;

}

function decProgressCounter(curr: number): number {

	return curr === 0 ? 0 : curr - 1;

}

export const coreUiReducer: ActionReducer<CoreUIState, Action> = createReducer(

	core_initialUIState,
	on(coreActions.loadAllSuccess, (state, { configuration }) => ({

		...state,
		sidebarState: evaluate(configuration.sidebarState ?? DEFAULT_CONF_VALUES.sidebarState, state.bigScreen),
		theme: configuration.theme ?? DEFAULT_CONF_VALUES.theme

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
	on(coreActions.setNextTheme, (state): CoreUIState => ({ ...state, theme: getNextTheme(state.theme) })),
	on(coreActions.setNow, (state): CoreUIState => ({ ...state, now: Date.now() })),
	on(coreActions.showProgressBar, (state): CoreUIState => ({ ...state, progressCounter: incProgressCounter(state.progressCounter) })),
	on(coreActions.hideProgressBar, (state): CoreUIState => ({ ...state, progressCounter: decProgressCounter(state.progressCounter) })),
	on(databaseActions.loadReport, (state): CoreUIState => ({ ...state, progressCounter: incProgressCounter(state.progressCounter) })),
	on(databaseActions.loadReportSuccess, (state): CoreUIState => ({ ...state, progressCounter: decProgressCounter(state.progressCounter) })),
	on(databaseActions.backupDatabase, (state): CoreUIState => ({ ...state, progressCounter: incProgressCounter(state.progressCounter) })),

);
