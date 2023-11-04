import { createAction, props } from '@ngrx/store';
import { Bookmark, Click, RemoteMetadata, SyncData, UUID } from '@lib';

export const loadAllBookmarksSuccess = createAction('[Bookmark] Load All Success', props<{ bookmarks: Bookmark[] }>());
export const loadAllClicksSuccess = createAction('[Bookmark Clicks] Load All Success', props<{ clicks: Click[] }>());

export const fromClipboard = createAction('[Bookmark] From Clipboard');
export const fromClipboardFailure = createAction('[Bookmark] From Clipboard Failure', props<{ shaking: boolean }>());

export const clickBookmark = createAction('[Bookmark] Click Bookmark', props<{ id: UUID }>());

export const loadSyncDataSuccess = createAction('[Stats Bookmark] Load SyncData Success', props<{ syncData: SyncData[] }>());
export const loadRemoteMetadataSuccess = createAction('[Stats Bookmark] Load RemoteMetadata Success', props<{ remoteMetadata: RemoteMetadata[] }>());
export const loadTrashCountSuccess = createAction('[Stats Bookmark] Load Trash Count Success', props<{ count: number }>());
