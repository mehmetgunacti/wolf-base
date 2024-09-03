import { UUID, WordQueryParams } from '@lib';
import { createAction, props } from '@ngrx/store';

// UI
export const search							= createAction('[Word] Search', props<{ term: string | null }>());
export const setSelectedId					= createAction('[Word] Set Selected Id', props<{ id: UUID | null }>());
export const setQueryParams					= createAction('[Word] Set Query State', props<WordQueryParams>());
