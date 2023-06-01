import { createAction, props } from '@ngrx/store';

export const switchTheme = createAction('[UI] Switch Theme');

export const setBigScreen = createAction('[UI] Set Big Screen', props<{ isBigScreen: boolean }>());
