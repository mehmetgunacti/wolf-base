import { createAction, props } from '@ngrx/store';
import { SyncData } from 'lib';

export const syncSuccess = createAction('[Bookmark Sync] SyncData Load Success', props<{ syncData: SyncData[] }>());
export const trashCountSuccess = createAction('[Bookmark Sync] Trash Count Success', props<{ count: number }>());