import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import * as fromActions from '../actions';
import * as fromStates from '../states';

export const confReducer: ActionReducer<fromStates.ConfState, Action> = createReducer(

	fromStates.initialConfState,
	on(fromActions.confSetAll, (state, params) => {

		return produce(
			state,
			draft => draft
		);

	}),

	on(fromActions.confChanged, (state, { configuration }) => ({ ...configuration, initialized: true }))

);
