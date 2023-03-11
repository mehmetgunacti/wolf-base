import { createAction, props } from '@ngrx/store';

export const addHeadScript = createAction('[Common] Add Head Script', props<{ url: string }>());
export const addHeadCSS = createAction('[Common] Add Head CSS', props<{ url: string }>());