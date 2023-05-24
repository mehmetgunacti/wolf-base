import { createAction, props } from '@ngrx/store';

export const setTotalBookmarksCount = createAction('[MENU] Set Total Bookmarks Count', props<{ count: number }>());
export const setSelectedBookmarksCount = createAction('[MENU] Set Selected Bookmarks Count', props<{ count: number }>());

