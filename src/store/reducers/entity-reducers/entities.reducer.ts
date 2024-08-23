import { Entity, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as actions from 'store/actions/entity.actions';
import { entity_initialState, Entity_ModuleState } from 'store/states/entity.state';

const reducer = createReducer(

	entity_initialState,
	on(actions.loadOneSuccess, (state, { entityType, id, entity, syncData, remoteMetadata }): Entity_ModuleState => {

		return produce(
			state,
			draft => {

				// note
				if (entity === null)
					delete draft[entityType].entities[id];
				else
					draft[entityType].entities[id] = entity;

				// syncData
				if (syncData === null)
					delete draft[entityType].syncData[id];
				else
					draft[entityType].syncData[id] = syncData;

				// remoteMetadata
				if (remoteMetadata === null)
					delete draft[entityType].remoteMetadata[id];
				else
					draft[entityType].remoteMetadata[id] = remoteMetadata;

			}
		);

	}),
	on(actions.loadAllSuccess, (state, { entityType, entities, syncData, remoteMetadata }): Entity_ModuleState => ({

		...state,
		[entityType]: {
			entities: entities.reduce((record, entity) => { record[entity.id] = entity; return record; }, {} as Record<UUID, Entity>),
			syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
			remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)
		}

	})),
	on(actions.moveToTrashSuccess, (state, { entityType, id }): Entity_ModuleState => {

		return produce(
			state,
			draft => { delete draft[entityType].entities[id]; }
		);

	}),

);

export function entitiesReducer(state: Entity_ModuleState | undefined, action: Action): Entity_ModuleState {
	return reducer(state, action);
}
