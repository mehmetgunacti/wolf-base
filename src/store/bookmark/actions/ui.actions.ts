import { createAction, props } from '@ngrx/store';
import { UUID } from 'lib';

export const toggleSearchAndTagCloudVisibility = createAction('[Tags] Toggle Search Tag Cloud Visibility');
export const openAddBookmarkDialog = createAction('[Bookmarks] Open Add Bookmark Dialog');
export const openEditBookmarkDialog = createAction('[Bookmarks] Open Edit Bookmark Dialog', props<{ id: UUID }>());
export const closeEditBookmarkDialog = createAction('[Bookmarks] Close Edit Bookmark Dialog');
