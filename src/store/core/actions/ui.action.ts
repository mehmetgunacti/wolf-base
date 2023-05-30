import { createAction, props } from '@ngrx/store';
import { THEME } from 'lib';

export const themeSet = createAction('[UI] Set Theme', props<{ theme: THEME }>());

export const setBigScreen = createAction('[UI] Set Big Screen', props<{ isBigScreen: boolean }>());
