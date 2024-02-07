import { createAction, props } from "@ngrx/store";
import { FirestoreConfig } from '@lib';

export const saveFirestoreConfig = createAction('[Settings] Save Firestore Config', props<{ config: FirestoreConfig }>());
export const saveFirestoreConfigSuccess = createAction('[Settings] Save Firestore Config Success');

export const saveTitleLookup = createAction('[Settings] Save Title Lookup', props<{ url: string }>());
export const saveTitleLookupSuccess = createAction('[Settings] Save Title Lookup Success');

export const savePopularBookmarksConfig = createAction('[Settings] Save Popular Bookmarks', props<{ tags: string[] }>());
export const savePopularBookmarksConfigSuccess = createAction('[Settings] Save Popular Bookmarks Success');

export const savePinnedNotesConfig = createAction('[Settings] Save Pinned Notes', props<{ tags: string[] }>());
export const savePinnedNotesConfigSuccess = createAction('[Settings] Save Pinned Notes Success');
