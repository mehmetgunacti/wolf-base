import { coreActions } from '@actions/core.actions';
import { entityActions } from '@actions/entity.actions';
import { UUID } from '@constants/common.constant';
import { AppEntityType } from '@constants/entity.constant';
import { Entity } from '@models/entity.model';
import { RemoteMetadata } from '@models/remote.model';
import { SyncData } from '@models/sync.model';
import { Action, createReducer, on } from '@ngrx/store';
import { entity_initialState, Entity_ModuleState } from '@states/entity.state';
import { produce } from 'immer';

function reduceEntities(data: Entity[]): Record<UUID, Entity> {

	return data.reduce((record, e) => { record[ e.id ] = e; return record; }, {} as Record<UUID, Entity>);

}

function reduceSyncData(data: SyncData[]): Record<UUID, SyncData> {

	return data.reduce((record, sd) => { record[ sd.id ] = sd; return record; }, {} as Record<UUID, SyncData>);

}

function reduceRemoteMetadata(data: RemoteMetadata[]): Record<UUID, RemoteMetadata> {

	return data.reduce((record, rmd) => { record[ rmd.id ] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>);

}

function reduceUUIDs(data: UUID[]): Record<UUID, boolean> {

	return data.reduce((record, id) => { record[ id ] = true; return record; }, {} as Record<UUID, boolean>);

}

const reducer = createReducer(

	entity_initialState,
	on(entityActions.loadOneSuccess, (state, { entityType, id, entity, syncData, remoteMetadata }): Entity_ModuleState => {

		return produce(
			state,
			draft => {

				// note
				if (entity === null)
					delete draft[ entityType ].entities[ id ];
				else
					draft[ entityType ].entities[ id ] = entity;

				// syncData
				if (syncData === null)
					delete draft[ entityType ].syncData[ id ];
				else
					draft[ entityType ].syncData[ id ] = syncData;

				// remoteMetadata
				if (remoteMetadata === null)
					delete draft[ entityType ].remoteMetadata[ id ];
				else
					draft[ entityType ].remoteMetadata[ id ] = remoteMetadata;

			}
		);

	}),
	on(coreActions.loadAllSuccess, (state, { entities }): Entity_ModuleState => {

		return produce(

			state,
			draft => {

				for (const d of entities) {

					draft[ d.entityType ].entities = reduceEntities(d.entities);
					draft[ d.entityType ].syncData = reduceSyncData(d.syncData);
					draft[ d.entityType ].remoteMetadata = reduceRemoteMetadata(d.remoteMetadata);
					draft[ d.entityType ].uuids = reduceUUIDs(d.uuids);

				}

			}

		);

	}),
	on(entityActions.moveToTrashSuccess, (state, { entityType, id }): Entity_ModuleState => {

		return produce(
			state,
			draft => { delete draft[ entityType ].entities[ id ]; }
		);

	}),
	on(entityActions.unloadOne, (state, { entityType, id }): Entity_ModuleState => {

		return produce(
			state,
			draft => {

				delete draft[ entityType ].entities[ id ];
				delete draft[ entityType ].syncData[ id ];
				delete draft[ entityType ].remoteMetadata[ id ];

			}
		);

	}),
	on(entityActions.downloadRemoteMetadataSuccess, (state, { data }): Entity_ModuleState => {

		return produce(

			state,
			draft => {

				Object.keys(data).forEach(key => {

					const entityType = key as AppEntityType;
					const remoteMetadata = data[ entityType ];
					draft[ entityType ].remoteMetadata = reduceRemoteMetadata(remoteMetadata);

				});

			}

		);

	}),

);

export function entitiesReducer(state: Entity_ModuleState | undefined, action: Action): Entity_ModuleState {
	return reducer(state, action);
}
