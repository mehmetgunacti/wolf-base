import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromStates from '../states';
import { BookmarksState } from '../states';

const reducer = createReducer(

	fromStates.bookmarksInitialState,

	on(fromActions.loadAllBookmarksSuccess, (state, { bookmarks }): BookmarksState =>
		fromStates.bookmarksAdapter.setAll(bookmarks, { ...state, bookmarksSearchTerm: '' })
	),

	on(fromActions.searchBookmarksSuccess, (state, { bookmarks }): BookmarksState =>
		fromStates.bookmarksAdapter.setAll(bookmarks, { ...state })
	),
	on(fromActions.openAddBookmarkDialog, (state): BookmarksState => ({ ...state, editDialogVisible: true, selected: null })),
	on(fromActions.openEditBookmarkDialog, (state, { id }): BookmarksState => ({ ...state, editDialogVisible: true, selected: id })),
	on(fromActions.closeEditBookmarkDialog, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null })),
	on(fromActions.createBookmarkSuccess, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null })),
	on(fromActions.updateBookmarkSuccess, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null }))

);

export function bookmarksReducer(state: fromStates.BookmarksState | undefined, action: Action): fromStates.BookmarksState {
	return reducer(state, action);
}
