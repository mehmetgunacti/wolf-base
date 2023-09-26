import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { confChanged } from 'store/actions/core.actions';
import { CoreConfigurationState, initialCoreConfigurationState } from 'store/states/core.state';

export const coreConfigurationReducer: ActionReducer<CoreConfigurationState, Action> = createReducer(

	initialCoreConfigurationState,
	// on(fromActions.confSetAll, (state, params) => {

	// 	return produce(
	// 		state,
	// 		draft => draft
	// 	);

	// }),

	on(confChanged, (state, { configuration }) => ({ ...configuration, initialized: true }))

);
