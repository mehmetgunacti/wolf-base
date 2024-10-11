import { AppEntityType, Click, idListToRecord, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { bookmarkActions, coreActions, entityActions } from 'store/actions';
import { bookmark_initialClicksState, BookmarkClicksState } from 'store/states/bookmark.state';

const reducer = createReducer(

	bookmark_initialClicksState,
	on(entityActions.unloadOne, (state, { entityType, id }): BookmarkClicksState => {

		if (entityType === AppEntityType.bookmark)
			return produce(
				state,
				draft => {

					delete draft.values[id];

				}
			);
		return state;

	}),
	on(coreActions.loadAllSuccess, (state, { clicks }): BookmarkClicksState => ({ ...state, values: idListToRecord(clicks) })),
	on(bookmarkActions.loadAllClicksSuccess, (state, { clicks }): BookmarkClicksState => ({ ...state, values: idListToRecord(clicks) })),
	on(
		bookmarkActions.loadOneClickSuccess, (state, { id, click }): BookmarkClicksState => {

			return produce(
				state,
				draft => {

					if (click === null)
						delete draft.values[id];
					else
						draft.values[id] = click;

				}
			);

		}
	)

);

export function bookmarkClicksReducer(state: BookmarkClicksState | undefined, action: Action): BookmarkClicksState {
	return reducer(state, action);
}
