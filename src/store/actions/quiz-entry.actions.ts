import { UUID, Word } from '@lib';
import { createAction, props } from '@ngrx/store';

// UI
export const openShowAnswerDialog			= createAction('[Quiz] Open Show Answer Dialog', props<{ word: Word }>());
export const closeShowAnswerDialog			= createAction('[Quiz] Close Show Answer Dialog', props<{ quizProgressId: UUID, editWord?: UUID }>());
export const increaseVisibility				= createAction('[Quiz] Increase Visibility');
