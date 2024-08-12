import { createSelector } from '@ngrx/store';
import { selTask_entities } from './task-entities.selectors';
import { selTask_UIState } from './task.selectors';

const selTask_selectedId = createSelector(

	selTask_UIState,
	state => state.selectedId

);

export const selTask_selected = createSelector(

	selTask_entities,
	selTask_selectedId,
	(entities, selectedId) => selectedId ? entities[selectedId] : null

);
