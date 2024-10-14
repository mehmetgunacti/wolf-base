import { ActionReducerMap } from '@ngrx/store';
import { CoreModuleState } from 'store/states/core.state';
import { coreConfigurationReducer } from './core-configuration.reducer';
import { coreUiReducer } from './core-ui.reducer';

export const coreReducer: ActionReducerMap<CoreModuleState> = {

	conf: coreConfigurationReducer,
	ui: coreUiReducer

};
