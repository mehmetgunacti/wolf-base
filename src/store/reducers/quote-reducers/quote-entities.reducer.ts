import { Quote, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as quoteActions from 'store/actions/quote.actions';
import { Quote_EntitiesState, quote_initialEntitiesState } from 'store/states/quote.state';

const reducer = createReducer(

	quote_initialEntitiesState,
	on(quoteActions.loadOneSuccess, (state, { id, quote, syncData, remoteMetadata }): Quote_EntitiesState => {

		return produce(
			state,
			draft => {

				// quote
				if (quote === null)
					delete draft.entities[id];
				else
					draft.entities[id] = quote;

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
	on(quoteActions.unloadOne, (state, { id }): Quote_EntitiesState => {

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
		quoteActions.loadAllSuccess, (state, { quotes, syncData, remoteMetadata }): Quote_EntitiesState => ({

			...state,
			entities: quotes.reduce((record, quote) => { record[quote.id] = quote; return record; }, {} as Record<UUID, Quote>),
			syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
			remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

		})
	),
	on(quoteActions.moveToTrashSuccess, (state, { id }): Quote_EntitiesState => {

		return produce(
			state,
			draft => { delete draft.entities[id]; }
		);

	}),
	on(quoteActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): Quote_EntitiesState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	}))

);

export function quote_EntitiesReducer(state: Quote_EntitiesState | undefined, action: Action): Quote_EntitiesState {
	return reducer(state, action);
}
