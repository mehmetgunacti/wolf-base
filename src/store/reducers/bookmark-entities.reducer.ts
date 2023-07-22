import { Action, createReducer, on } from '@ngrx/store';
import { Bookmark, UUID } from 'lib';
import { closeEditBookmarkDialog, openAddBookmarkDialog, openEditBookmarkDialog } from 'store/actions/bookmark-ui.actions';
import { clicksSuccess, createBookmarkSuccess, loadAllBookmarksSuccess, updateBookmarkSuccess } from 'store/actions/bookmark.actions';
import { BookmarkEntitiesState, initialBookmarkEntitiesState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkEntitiesState,

	on(
		loadAllBookmarksSuccess, (state, { bookmarks }): BookmarkEntitiesState => ({
			...state,
			entities: bookmarks.reduce((record, bookmark) => { record[bookmark.id] = bookmark; return record; }, {} as Record<UUID, Bookmark>)
		})
	),
	on(openAddBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(openEditBookmarkDialog, (state, { id }): BookmarkEntitiesState => ({ ...state, selected: id })),
	on(closeEditBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(createBookmarkSuccess, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(updateBookmarkSuccess, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(clicksSuccess, (state, { clicks }): BookmarkEntitiesState => ({ ...state, clicks }))
	// on(togglePopular, (state, { id }): BookmarkEntitiesState => fromStates.entitiesAdapter.updateOne({ id, changes: { tags: toggleArrayItem(state.entities[id]?.tags, POPULAR) } }, state))

);

export function bookmarkEntitiesReducer(state: BookmarkEntitiesState | undefined, action: Action): BookmarkEntitiesState {
	return reducer(state, action);
}
