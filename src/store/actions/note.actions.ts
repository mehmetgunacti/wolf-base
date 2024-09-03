import { NoteContent, NoteQueryParams, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// UI
export const setSelectedId					= createAction('[Note] Set Selected Id', props<{ id: UUID | null }>());
export const setEditId						= createAction('[Note] Set Edit Id', props<{ id: UUID | null }>());
export const setQueryParams					= createAction('[Note] Set Query State', props<NoteQueryParams>());

// TAGS
export const clickTag						= createAction('[Note] Click Tag', props<{ name: string }>());
export const setSelectedTags				= createAction('[Note] Set Selected Tags', props<{ tags: string[] }>());
export const emptySelectedTags				= createAction('[Note] Empty Selected Tags');
export const search							= createAction('[Note] Search', props<{ term: string }>());

// CONTENT
export const loadOneContentSuccess			= createAction('[Note] Load One Content Success', props<{ content: NoteContent | null }>());
