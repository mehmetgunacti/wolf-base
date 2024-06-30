import { SidebarState, Theme } from '@lib';
import { createAction, props } from '@ngrx/store';

export const setBigScreen = createAction('[UI] Set Big Screen', props<{ isBigScreen: boolean }>());
export const setTheme = createAction('[UI] Set Theme', props<{ theme: Theme }>());
export const setSidebarState = createAction('[UI] Set Sidebar State', props<{ sidebarState: SidebarState }>());
export const setQuotesRunning = createAction('[UI] Set Quotes Running', props<{ running: boolean }>());
