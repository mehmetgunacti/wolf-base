import { AppEntityType, Click, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as bmActions from 'store/actions/bookmark.actions';
import * as entityActions from 'store/actions/entity.actions';
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
	on(
		bmActions.loadAllClicksSuccess, (state, { clicks }): BookmarkClicksState => {

			return produce(
				state,
				draft => {

					draft.values = clicks.reduce((record, click) => { record[click.id] = click; return record; }, {} as Record<UUID, Click>)

				}
			);

		}
	),
	on(
		bmActions.loadOneClickSuccess, (state, { id, click }): BookmarkClicksState => {

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
