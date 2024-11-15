import { bookmarkActions } from '@actions/bookmark.actions';
import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { AppEntityType } from '@constants/entity.constant';
import { Action, createReducer, on } from '@ngrx/store';
import { bookmark_initialClicksState, BookmarkClicksState } from '@states/bookmark.state';
import { idListToRecord } from '@utils/array.util';
import { produce } from 'immer';

const reducer = createReducer(

	bookmark_initialClicksState,
	on(entityActions.unloadOne, (state, { entityType, id }): BookmarkClicksState => {

		if (entityType === AppEntityType.bookmark)
			return produce(
				state,
				draft => {

					delete draft.values[ id ];

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
						delete draft.values[ id ];
					else
						draft.values[ id ] = click;

				}
			);

		}
	)

);

export function bookmarkClicksReducer(state: BookmarkClicksState | undefined, action: Action): BookmarkClicksState {
	return reducer(state, action);
}
