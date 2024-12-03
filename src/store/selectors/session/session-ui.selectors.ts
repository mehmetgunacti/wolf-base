import { Session } from '@models/test-suite.model';
import { createSelector } from '@ngrx/store';
import { selSession_EntityMap } from '../entity/entity-session.selectors';
import { selSession_UIState } from './session.selectors';

// SELECTED ID
const selSession_SelectedId = createSelector(

	selSession_UIState,
	state => state.selectedId

);

export const selSession_selected = createSelector(

	selSession_EntityMap,
	selSession_SelectedId,
	(state, id): Session | null => id ? state[ id ] ?? null : null

);
