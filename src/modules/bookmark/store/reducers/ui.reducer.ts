import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromStates from '../states';

const reducer = createReducer(

	fromStates.uiInitialState,

	on(

		fromActions.uiToggleTagCloudVisibility,
		state => ({

			...state,
			tagCloudVisible: !state.tagCloudVisible

		})

	),

);

export function uiReducer(state: fromStates.UIState | undefined, action: Action): fromStates.UIState {
	return reducer(state, action);
}
