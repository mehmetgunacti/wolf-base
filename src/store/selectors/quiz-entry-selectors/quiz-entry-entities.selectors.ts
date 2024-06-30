import { QuizEntry } from '@lib';
import { createSelector } from '@ngrx/store';
import { selQuizEntry_EntitiesState } from './quizEntry.selectors';

export const selQuizEntry_entities = createSelector(

	selQuizEntry_EntitiesState,
	entities => entities.entities

);

export const selQuizEntry_ids = createSelector(

	selQuizEntry_EntitiesState,
	state => Object.keys(state.entities)

);

export const selQuizEntry_array = createSelector(

	selQuizEntry_EntitiesState,
	(state): QuizEntry[] => Object.values(state.entities)

);

export const selQuizEntries_count = createSelector(

	selQuizEntry_ids,
	ids => ids.length

);
