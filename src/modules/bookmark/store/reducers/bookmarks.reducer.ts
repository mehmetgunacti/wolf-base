import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromStates from '../states';
import { BookmarksState } from '../states';

const reducer = createReducer(

	fromStates.bookmarksInitialState,

	on(fromActions.bookmarksLoadAll, (state): BookmarksState => fromStates.bookmarksAdapter.setAll([], { ...state })),
	on(fromActions.bookmarksSearch, (state): BookmarksState => fromStates.bookmarksAdapter.setAll([], { ...state })),
	// on(fromActions.tagsToggleSelected, (state): BookmarksState => fromStates.bookmarksAdapter.setAll([], { ...state })),

	on(fromActions.bookmarksLoadAllSuccess, (state, { bookmarks }): BookmarksState =>
		fromStates.bookmarksAdapter.setAll(bookmarks, { ...state, bookmarksSearchTerm: '' })
	),

	on(fromActions.bookmarksSearchSuccess, (state, { bookmarks }): BookmarksState =>
		fromStates.bookmarksAdapter.setAll(bookmarks, { ...state })
	),
	on(fromActions.bookmarksAddOpenDialog, (state): BookmarksState => ({ ...state, editDialogVisible: true, selected: null })),
	on(fromActions.bookmarksEditOpenDialog, (state, { id }): BookmarksState => ({ ...state, editDialogVisible: true, selected: id })),
	on(fromActions.bookmarksEditCloseDialog, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null })),
	on(fromActions.bookmarksCreateSuccess, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null })),
	on(fromActions.bookmarksUpdateSuccess, (state): BookmarksState => ({ ...state, editDialogVisible: false, selected: null }))
	// on(fromActions.bookmarksSaveSuccess, (state, { bookmark }): BookmarksState => {

	// 	// todo
	// 	const newbookmarkState = fromStates.bookmarksAdapter.upsertOne(bookmark, { ...state, editDialogVisible: false, selected: null })
	// 	return newbookmarkState;
	// }
	// ),

);

export function bookmarksReducer(state: fromStates.BookmarksState | undefined, action: Action): fromStates.BookmarksState {
	return reducer(state, action);
}
