import { createAction, props } from '@ngrx/store';
import { Configuration, Credentials } from 'lib';

// export const confSetAll = createAction('[CONF] Set All', props<{ newTheme: ThemeInfo }>());

export const confChanged = createAction('[Configuration] Configuration Changed', props<{ configuration: Configuration }>());

export const setSidebarVisible = createAction('[Configuration] Set Sidebar Visibility', props<{ visible: boolean }>());

export const saveCredentials = createAction('[Configuration] Save Credentials', props<{ credentials: Credentials }>());
export const saveCredentialsSuccess = createAction('[Configuration] Save Credentials Success');
