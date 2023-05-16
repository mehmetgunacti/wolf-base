import { createAction, props } from '@ngrx/store';
import { Configuration, ThemeInfo } from 'lib';

export const confSetAll = createAction('[CONF] Set All', props<{ newTheme: ThemeInfo }>());

export const confChanged = createAction('[CONF] Configuration Changed', props<{ configuration: Configuration }>());
