import { createAction, props } from '@ngrx/store';
import { Configuration, FirestoreConfig } from 'lib';

// export const confSetAll = createAction('[CONF] Set All', props<{ newTheme: ThemeInfo }>());

export const confChanged = createAction('[Configuration] Configuration Changed', props<{ configuration: Configuration }>());

export const setSidebarVisible = createAction('[Configuration] Set Sidebar Visibility', props<{ visible: boolean }>());

export const saveFirestoreConfig = createAction('[Configuration] Save Firestore Config', props<{ config: FirestoreConfig }>());
export const saveFirestoreConfigSuccess = createAction('[Configuration] Save Firestore Config Success');
