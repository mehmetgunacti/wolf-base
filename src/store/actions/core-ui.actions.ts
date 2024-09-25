import { SidebarState, Theme } from '@lib';
import { createAction, props } from '@ngrx/store';

export const setBigScreen			= createAction('[Core UI] Set Big Screen', props<{ isBigScreen: boolean }>());
export const setSidebarState		= createAction('[Core UI] Set Sidebar State', props<{ state: SidebarState }>());
export const setNextSidebarState	= createAction('[Core UI] Set Next Sidebar State');
export const setTheme				= createAction('[Core UI] Set Theme', props<{ theme: Theme }>());
export const setNow					= createAction('[Core UI] Set Now');
