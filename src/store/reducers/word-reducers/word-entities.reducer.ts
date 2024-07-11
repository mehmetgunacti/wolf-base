import { Word, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as wordActions from 'store/actions/word.actions';
import { Word_EntitiesState, word_initialEntitiesState } from 'store/states/word.state';

const reducer = createReducer(

	word_initialEntitiesState,
	on(wordActions.loadOneSuccess, (state, { id, word, syncData, remoteMetadata }): Word_EntitiesState => {

		return produce(
			state,
			draft => {

				// word
				if (word === null)
					delete draft.entities[id];
				else
					draft.entities[id] = word;

				// syncData
				if (syncData === null)
					delete draft.syncData[id];
				else
					draft.syncData[id] = syncData;

				// remoteMetadata
				if (remoteMetadata === null)
					delete draft.remoteMetadata[id];
				else
					draft.remoteMetadata[id] = remoteMetadata;

			}
		);

	}),
	on(wordActions.unloadOne, (state, { id }): Word_EntitiesState => {

		return produce(
			state,
			draft => {

				delete draft.entities[id];
				delete draft.syncData[id];
				delete draft.remoteMetadata[id];

			}
		);

	}),
	on(
		wordActions.loadAllSuccess, (state, { words, syncData, remoteMetadata }): Word_EntitiesState => ({

			...state,
			entities: words.reduce((record, word) => { record[word.id] = word; return record; }, {} as Record<UUID, Word>),
			syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
			remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

		})
	),
	on(wordActions.moveToTrashSuccess, (state, { id }): Word_EntitiesState => {

		return produce(
			state,
			draft => { delete draft.entities[id]; }
		);

	}),
	on(wordActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): Word_EntitiesState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	}))

);

export function word_EntitiesReducer(state: Word_EntitiesState | undefined, action: Action): Word_EntitiesState {
	return reducer(state, action);
}
