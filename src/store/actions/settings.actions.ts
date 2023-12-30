import { createAction, props } from "@ngrx/store";
import { FirestoreConfig } from '@lib';

export const saveFirestoreConfig = createAction('[Settings] Save Firestore Config', props<{ config: FirestoreConfig }>());
export const saveFirestoreConfigSuccess = createAction('[Settings] Save Firestore Config Success');

export const saveTitleLookup = createAction('[Settings] Save Title Lookup', props<{ url: string }>());
export const saveTitleLookupSuccess = createAction('[Settings] Save Title Lookup Success');
