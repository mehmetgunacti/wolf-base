import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as fromStates from '../states';
import { CoreActions } from 'store/actions';

export const confReducer: ActionReducer<fromStates.ConfState, Action> = createReducer(

	fromStates.initialConfState,
	// on(fromActions.confSetAll, (state, params) => {

	// 	return produce(
	// 		state,
	// 		draft => draft
	// 	);

	// }),

	on(CoreActions.confChanged, (state, { configuration }) => ({ ...configuration, initialized: true }))

);
