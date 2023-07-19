import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { CoreActions } from 'store/actions';
import { CoreConfigurationState, initialCoreConfigurationState } from 'store/states/core.state';

export const coreConfigurationReducer: ActionReducer<CoreConfigurationState, Action> = createReducer(

	initialCoreConfigurationState,
	// on(fromActions.confSetAll, (state, params) => {

	// 	return produce(
	// 		state,
	// 		draft => draft
	// 	);

	// }),

	on(CoreActions.confChanged, (state, { configuration }) => ({ ...configuration, initialized: true }))

);
