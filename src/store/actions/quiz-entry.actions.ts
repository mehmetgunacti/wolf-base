import { UUID, Word } from '@lib';
import { createAction, props } from '@ngrx/store';

// UI
export const answeredRight			= createAction('[Quiz] Answered Right', props<{ quizEntryId: UUID }>());
export const answeredWrong			= createAction('[Quiz] Answered Wrong', props<{ word: Word }>());

export const closeAnswerDialog		= createAction('[Quiz] Close Answer Dialog', props<{ quizEntryId: UUID, editWord?: UUID }>());

export const increaseVisibility		= createAction('[Quiz] Increase Visibility');
