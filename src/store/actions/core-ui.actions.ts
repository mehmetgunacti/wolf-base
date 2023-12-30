import { createAction, props } from '@ngrx/store';

export const switchTheme = createAction('[UI] Switch Theme');
export const setBigScreen = createAction('[UI] Set Big Screen', props<{ isBigScreen: boolean }>());
export const toggleSidebar = createAction('[UI] Toggle Sidebar');
export const hideSidebar = createAction('[UI] Hide Sidebar');
