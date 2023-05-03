import { createAction, props } from '@ngrx/store';
import { ThemeInfo } from 'lib';

export const themeSet = createAction('[UI] Set Theme', props<{ newTheme: ThemeInfo }>());

export const setBigScreen = createAction('[UI] Set Big Screen', props<{ isBigScreen: boolean }>());
