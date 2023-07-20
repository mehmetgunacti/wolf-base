import { createAction, props } from '@ngrx/store';
import { Configuration, FirestoreConfig } from 'lib';

export const confChanged = createAction('[Configuration] Configuration Changed', props<{ configuration: Configuration }>());

export const saveFirestoreConfig = createAction('[Configuration] Save Firestore Config', props<{ config: FirestoreConfig }>());
export const saveFirestoreConfigSuccess = createAction('[Configuration] Save Firestore Config Success');

export const saveTitleLookup = createAction('[Configuration] Save Title Lookup', props<{ url: string }>());
export const saveTitleLookupSuccess = createAction('[Configuration] Save Title Lookup Success');