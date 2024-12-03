import { ActionReducerMap } from '@ngrx/store';
import { Core_ModuleState } from 'store/states/core.state';
import { coreConfigurationReducer } from './core-configuration.reducer';
import { coreUiReducer } from './core-ui.reducer';

export const coreReducer: ActionReducerMap<Core_ModuleState> = {

	conf: coreConfigurationReducer,
	ui: coreUiReducer

};
