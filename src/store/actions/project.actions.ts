import { ProjectQueryParams, UUID } from '@lib';
import { createAction, props } from '@ngrx/store';

// UI
export const search				= createAction('[Project] Search', props<{ term: string | null }>());
export const setSelectedId		= createAction('[Project] Set Selected Id', props<{ id: UUID | null }>());
export const setQueryParams		= createAction('[Project] Set Query State', props<ProjectQueryParams>());
