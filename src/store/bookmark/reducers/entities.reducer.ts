import { Action, createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromStates from '../states';

const reducer = createReducer(

	fromStates.entitiesInitialState,

	on(
		fromActions.loadAllBookmarksSuccess, (state, { bookmarks }): fromStates.EntitiesState => ({
			...state,
			entities: bookmarks.reduce((map, bookmark) => { map.set(bookmark.id, bookmark); return map; }, new Map())
		})
	),
	on(fromActions.openAddBookmarkDialog, (state): fromStates.EntitiesState => ({ ...state, selected: null })),
	on(fromActions.openEditBookmarkDialog, (state, { id }): fromStates.EntitiesState => ({ ...state, selected: id })),
	on(fromActions.closeEditBookmarkDialog, (state): fromStates.EntitiesState => ({ ...state, selected: null })),
	on(fromActions.createBookmarkSuccess, (state): fromStates.EntitiesState => ({ ...state, selected: null })),
	on(fromActions.updateBookmarkSuccess, (state): fromStates.EntitiesState => ({ ...state, selected: null })),
	on(fromActions.bookmarksClicksSuccess, (state, { clicks }): fromStates.EntitiesState => ({ ...state, clicks }))
	// on(fromActions.togglePopular, (state, { id }): fromStates.EntitiesState => fromStates.entitiesAdapter.updateOne({ id, changes: { tags: toggleArrayItem(state.entities[id]?.tags, POPULAR) } }, state))

);

export function entitiesReducer(state: fromStates.EntitiesState | undefined, action: Action): fromStates.EntitiesState {
	return reducer(state, action);
}
