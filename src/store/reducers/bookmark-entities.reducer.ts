import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkActions } from 'store/actions';
import { BookmarkEntitiesState, initialBookmarkEntitiesState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkEntitiesState,

	on(
		BookmarkActions.loadAllBookmarksSuccess, (state, { bookmarks }): BookmarkEntitiesState => ({
			...state,
			entities: bookmarks.reduce((map, bookmark) => { map.set(bookmark.id, bookmark); return map; }, new Map())
		})
	),
	on(BookmarkActions.UI.openAddBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(BookmarkActions.UI.openEditBookmarkDialog, (state, { id }): BookmarkEntitiesState => ({ ...state, selected: id })),
	on(BookmarkActions.UI.closeEditBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(BookmarkActions.createBookmarkSuccess, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(BookmarkActions.updateBookmarkSuccess, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(BookmarkActions.clicksSuccess, (state, { clicks }): BookmarkEntitiesState => ({ ...state, clicks }))
	// on(BookmarkActions.togglePopular, (state, { id }): BookmarkEntitiesState => fromStates.entitiesAdapter.updateOne({ id, changes: { tags: toggleArrayItem(state.entities[id]?.tags, POPULAR) } }, state))

);

export function bookmarkEntitiesReducer(state: BookmarkEntitiesState | undefined, action: Action): BookmarkEntitiesState {
	return reducer(state, action);
}
