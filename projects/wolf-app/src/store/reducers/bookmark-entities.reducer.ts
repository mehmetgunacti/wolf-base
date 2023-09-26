import { Action, createReducer, on } from '@ngrx/store';
import { Bookmark, Click, UUID } from 'lib';
import { closeEditBookmarkDialog, openAddBookmarkDialog, openEditBookmarkDialog } from 'store/actions/bookmark-ui.actions';
import { createBookmarkSuccess, loadAllBookmarksSuccess, loadAllClicksSuccess, updateBookmarkSuccess } from 'store/actions/bookmark.actions';
import { BookmarkEntitiesState, initialBookmarkEntitiesState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkEntitiesState,

	on(
		loadAllBookmarksSuccess, (state, { bookmarks }): BookmarkEntitiesState => ({
			...state,
			entities: bookmarks.reduce((record, bookmark) => { record[bookmark.id] = bookmark; return record; }, {} as Record<UUID, Bookmark>)
		})
	),
	on(
		loadAllClicksSuccess, (state, { clicks }): BookmarkEntitiesState => ({
			...state,
			clicks: clicks.reduce((record, click) => { record[click.id] = click; return record; }, {} as Record<UUID, Click>)
		})
	),
	on(openAddBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(openEditBookmarkDialog, (state, { id }): BookmarkEntitiesState => ({ ...state, selected: id })),
	on(closeEditBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(createBookmarkSuccess, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(updateBookmarkSuccess, (state): BookmarkEntitiesState => ({ ...state, selected: null }))

);

export function bookmarkEntitiesReducer(state: BookmarkEntitiesState | undefined, action: Action): BookmarkEntitiesState {
	return reducer(state, action);
}
