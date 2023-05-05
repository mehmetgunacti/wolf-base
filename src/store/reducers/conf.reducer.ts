import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { confSetAll } from 'store/actions/conf.action';
import { ConfState, initialConfState } from 'store/states';

export const confReducer: ActionReducer<ConfState, Action> = createReducer(

	initialConfState,
	on(confSetAll, (state, params) => {

		return produce(
			state,
			draft => draft
		);

	})

);
