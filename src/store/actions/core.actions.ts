import { Configuration } from '@lib';
import { createAction, props } from '@ngrx/store';

export const loadAll = createAction('[Configuration] Load All');
export const loadAllSuccess = createAction('[Configuration] Load All Success', props<{ configuration: Configuration }>());

