import { QuizProgress, UUID } from '@lib';
import { createSelector } from '@ngrx/store';
import { selQuizEntry_EntitiesState } from './quiz-entry.selectors';

export const selQuizEntry_entities = createSelector(

	selQuizEntry_EntitiesState,
	(entities): Record<UUID, QuizProgress> => entities.entities as Record<UUID, QuizProgress>

);

export const selQuizEntry_ids = createSelector(

	selQuizEntry_EntitiesState,
	state => Object.keys(state.entities)

);

export const selQuizEntry_array = createSelector(

	selQuizEntry_entities,
	(entities): QuizProgress[] => Object.values(entities)

);

export const selQuizEntries_count = createSelector(

	selQuizEntry_ids,
	ids => ids.length

);
