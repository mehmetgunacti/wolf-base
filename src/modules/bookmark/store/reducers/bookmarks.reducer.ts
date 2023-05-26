import { Action, createReducer, on } from '@ngrx/store';
import { POPULAR } from 'lib';
import { toggleArrayItem } from 'utils';
import * as fromActions from '../actions';
import * as fromStates from '../states';
import { BookmarksState } from '../states';
import { bookmarksArray } from '../selectors';

const reducer = createReducer(

	fromStates.bookmarksInitialState,

	on(fromActions.loadAllBookmarksSuccess, (state, { bookmarks }): BookmarksState =>
		fromStates.bookmarksAdapter.setAll(bookmarks, { ...state, searchTerm: null })
	),
	on(fromActions.openAddBookmarkDialog, (state): BookmarksState => ({ ...state, editDialogVisible: true, selected: null })),
	on(fromActions.openEditBookmarkDialog, (state, { id }): BookmarksState => ({ ...state, editDialogVisible: true, selected: id })),
	on(fromActions.closeEditBookmarkDialog, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null })),
	on(fromActions.createBookmarkSuccess, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null })),
	on(fromActions.updateBookmarkSuccess, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null })),
	on(fromActions.togglePopular, (state, { id }): BookmarksState => fromStates.bookmarksAdapter.updateOne({ id, changes: { tags: toggleArrayItem(state.entities[id]?.tags, POPULAR) } }, state))

);

export function bookmarksReducer(state: fromStates.BookmarksState | undefined, action: Action): fromStates.BookmarksState {
	return reducer(state, action);
}
