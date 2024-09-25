import { SidebarAnimation, Theme } from '@lib';
import { createAction, props } from '@ngrx/store';

export const setBigScreen			= createAction('[Core UI] Set Big Screen', props<{ isBigScreen: boolean }>());
export const setTheme				= createAction('[Core UI] Set Theme', props<{ theme: Theme }>());
export const setSidebarAnimation	= createAction('[Core UI] Set Sidebar Animation', props<{ animation: SidebarAnimation }>());
export const setNow					= createAction('[Core UI] Set Now');
