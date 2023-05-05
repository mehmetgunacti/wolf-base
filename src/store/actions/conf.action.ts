import { createAction, props } from '@ngrx/store';
import { ThemeInfo } from 'lib';

export const confSetAll = createAction('[CONF] Set All', props<{ newTheme: ThemeInfo }>());
