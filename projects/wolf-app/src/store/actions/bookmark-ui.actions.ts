import { createAction, props } from '@ngrx/store';
import { OVERLAY_ID, UUID } from '@lib';

export const toggleSearchAndTagCloudVisibility = createAction('[Bookmark UI] Toggle Search Tag Cloud Visibility');

export const openAddBookmarkDialog = createAction('[Bookmark UI] Open Add Dialog');
export const openAddBookmarkDialogSuccess = createAction('[Bookmark UI] Open Add Dialog Success', props<{ id: OVERLAY_ID }>());

export const openEditBookmarkDialog = createAction('[Bookmark UI] Open Edit Dialog', props<{ id: UUID }>());
export const openEditBookmarkDialogSuccess = createAction('[Bookmark UI] Open Edit Dialog Success', props<{ id: OVERLAY_ID }>());

export const closeEditBookmarkDialog = createAction('[Bookmark UI] Close Edit Dialog');
export const closeEditBookmarkDialogSuccess = createAction('[Bookmark UI] Close Edit Dialog Success');

export const togglePopular = createAction('[Bookmark UI] Toggle Popular', props<{ id: UUID }>());
