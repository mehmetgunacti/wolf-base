import { createSelector } from '@ngrx/store';
import { selQuizEntry_EntitiesState, selQuizEntry_UIState } from './quizEntry.selectors';

const selQuizEntry_selectedId = createSelector(

	selQuizEntry_UIState,
	state => state.selectedId

);

export const selQuizEntry_selected = createSelector(

	selQuizEntry_EntitiesState,
	selQuizEntry_selectedId,
	(entities, selectedId) => selectedId ? entities.entities[selectedId] : null

);
