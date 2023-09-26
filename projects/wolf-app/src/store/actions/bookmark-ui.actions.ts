import { createAction, props } from '@ngrx/store';
import { UUID } from 'lib';

export const toggleSearchAndTagCloudVisibility = createAction('[Bookmark UI] Toggle Search Tag Cloud Visibility');
export const openAddBookmarkDialog = createAction('[Bookmark UI] Open Add Bookmark Dialog');
export const openEditBookmarkDialog = createAction('[Bookmark UI] Open Edit Bookmark Dialog', props<{ id: UUID }>());
export const closeEditBookmarkDialog = createAction('[Bookmark UI] Close Edit Bookmark Dialog');
export const togglePopular = createAction('[Bookmark UI] Toggle Popular', props<{ id: UUID }>());