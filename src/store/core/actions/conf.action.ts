import { createAction, props } from '@ngrx/store';
import { Configuration } from 'lib';

// export const confSetAll = createAction('[CONF] Set All', props<{ newTheme: ThemeInfo }>());

export const confChanged = createAction('[Configuration] Configuration Changed', props<{ configuration: Configuration }>());

export const setSidebarVisible = createAction('[Configuration] Set Sidebar Visibility', props<{ visible: boolean }>());
