import { Bookmark, Click, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as bmActions from 'store/actions/bookmark.actions';
import { BookmarkEntitiesState, initialBookmarkEntitiesState } from 'store/states/bookmark.state';

const reducer = createReducer(

	initialBookmarkEntitiesState,
	on(bmActions.loadOneSuccess, (state, { bookmark }): BookmarkEntitiesState => {

		return produce(
			state,
			draft => { draft.entities[bookmark.id] = bookmark }
		);

	}),
	on(
		bmActions.loadAllSuccess, (state, { bookmarks }): BookmarkEntitiesState => ({
			...state,
			entities: bookmarks.reduce((record, bookmark) => { record[bookmark.id] = bookmark; return record; }, {} as Record<UUID, Bookmark>)
		})
	),
	on(
		bmActions.loadAllClicksSuccess, (state, { clicks }): BookmarkEntitiesState => ({
			...state,
			clicks: clicks.reduce((record, click) => { record[click.id] = click; return record; }, {} as Record<UUID, Click>)
		})
	),
	on(bmActions.moveToTrashSuccess, (state, { id }): BookmarkEntitiesState => {

		return produce(
			state,
			draft => { delete draft.entities[id]; }
		);

	}),
	on(bmActions.syncRemoteDeletedSuccess, (state, { item }): BookmarkEntitiesState => {

		return produce(
			state,
			draft => {
				delete draft.entities[item.id];
			}
		);

	}),
	on(bmActions.openAddBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null })),
	on(bmActions.openEditBookmarkDialog, (state, { id }): BookmarkEntitiesState => ({ ...state, selected: id })),
	on(bmActions.closeEditBookmarkDialog, (state): BookmarkEntitiesState => ({ ...state, selected: null }))

);

export function bookmarkEntitiesReducer(state: BookmarkEntitiesState | undefined, action: Action): BookmarkEntitiesState {
	return reducer(state, action);
}
