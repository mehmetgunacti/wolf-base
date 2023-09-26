import { createAction, props } from '@ngrx/store';
import { Configuration } from 'lib';

export const confChanged = createAction('[Configuration] Configuration Changed', props<{ configuration: Configuration }>());