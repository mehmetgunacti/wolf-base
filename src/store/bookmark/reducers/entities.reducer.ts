import { Action, createReducer, on } from '@ngrx/store';
import { BookmarkActions } from 'store/actions';
import * as fromStates from '../states';

const reducer = createReducer(

	fromStates.entitiesInitialState,

	on(
		BookmarkActions.loadAllBookmarksSuccess, (state, { bookmarks }): fromStates.EntitiesState => ({
			...state,
			entities: bookmarks.reduce((map, bookmark) => { map.set(bookmark.id, bookmark); return map; }, new Map())
		})
	),
	on(BookmarkActions.UI.openAddBookmarkDialog, (state): fromStates.EntitiesState => ({ ...state, selected: null })),
	on(BookmarkActions.UI.openEditBookmarkDialog, (state, { id }): fromStates.EntitiesState => ({ ...state, selected: id })),
	on(BookmarkActions.UI.closeEditBookmarkDialog, (state): fromStates.EntitiesState => ({ ...state, selected: null })),
	on(BookmarkActions.createBookmarkSuccess, (state): fromStates.EntitiesState => ({ ...state, selected: null })),
	on(BookmarkActions.updateBookmarkSuccess, (state): fromStates.EntitiesState => ({ ...state, selected: null })),
	on(BookmarkActions.clicksSuccess, (state, { clicks }): fromStates.EntitiesState => ({ ...state, clicks }))
	// on(BookmarkActions.togglePopular, (state, { id }): fromStates.EntitiesState => fromStates.entitiesAdapter.updateOne({ id, changes: { tags: toggleArrayItem(state.entities[id]?.tags, POPULAR) } }, state))

);

export function entitiesReducer(state: fromStates.EntitiesState | undefined, action: Action): fromStates.EntitiesState {
	return reducer(state, action);
}
