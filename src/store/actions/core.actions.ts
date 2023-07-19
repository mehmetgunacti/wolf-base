import { createAction, props } from '@ngrx/store';
import { Configuration, FirestoreConfig, ToastConfiguration } from 'lib';

export const confChanged = createAction('[Configuration] Configuration Changed', props<{ configuration: Configuration }>());
export const saveFirestoreConfig = createAction('[Configuration] Save Firestore Config', props<{ config: FirestoreConfig }>());
export const saveFirestoreConfigSuccess = createAction('[Configuration] Save Firestore Config Success');