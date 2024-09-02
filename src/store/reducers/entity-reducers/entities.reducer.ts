import { AppEntityType, Entity, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as actions from 'store/actions/entity.actions';
import * as quoteActions from 'store/actions/quote.actions';
import * as taskActions from 'store/actions/project-task.actions';
import * as noteActions from 'store/actions/note.actions';
import { entity_initialState, Entity_ModuleState } from 'store/states/entity.state';
import { selEntity_ModuleState } from 'store/selectors/entity-selectors/entity.selectors';

function reduceEntities(data: Entity[]): Record<UUID, Entity> {

	return data.reduce((record, e) => { record[e.id] = e; return record; }, {} as Record<UUID, Entity>);

}


function reduceSyncData(data: SyncData[]): Record<UUID, SyncData> {

	return data.reduce((record, sd) => { record[sd.id] = sd; return record; }, {} as Record<UUID, SyncData>);

}

function reduceRemoteMetadata(data: RemoteMetadata[]): Record<UUID, RemoteMetadata> {

	return data.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>);

}

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
	on(actions.loadAllSuccess, (state, { data }): Entity_ModuleState => {

		return produce(

			state,
			draft => {

				for (const d of data) {

					draft[d.entityType].entities = reduceEntities(d.entities);
					draft[d.entityType].syncData = reduceSyncData(d.syncData);
					draft[d.entityType].remoteMetadata = reduceRemoteMetadata(d.remoteMetadata);

				}

			}

		);

	}),
	on(actions.moveToTrashSuccess, (state, { entityType, id }): Entity_ModuleState => {

		return produce(
			state,
			draft => { delete draft[entityType].entities[id]; }
		);

	}),
	on(actions.unloadOne, (state, { entityType, id }): Entity_ModuleState => {

		return produce(
			state,
			draft => {

				delete draft[entityType].entities[id];
				delete draft[entityType].syncData[id];
				delete draft[entityType].remoteMetadata[id];

			}
		);

	}),
	on(actions.downloadRemoteMetadataSuccess, (state, { data }): Entity_ModuleState => {

		return produce(

			state,
			draft => {

				Object.keys(data).forEach(key => {

					const entityType = key as AppEntityType;
					const remoteMetadata = data[entityType];
					draft[entityType].remoteMetadata = reduceRemoteMetadata(remoteMetadata);

				});

			}

		);

	}),
	on(actions.setSelectedId, (state, { entityType, id }): Entity_ModuleState => ({ ...state, [entityType]: { ...state[entityType], selectedId: id } })),
	on(quoteActions.changeQuote, (state, { id }): Entity_ModuleState => ({ ...state, quote: { ...state.quote, selectedId: id } })),
	on(taskActions.openAddTaskDialog, (state): Entity_ModuleState => ({ ...state, task: { ...state.task, selectedId: null } })),
	on(taskActions.openEditTaskDialog, (state, { id }): Entity_ModuleState => ({ ...state, task: { ...state.task, selectedId: id } })),
	on(taskActions.closeEditDialog, (state): Entity_ModuleState => ({ ...state, task: { ...state.task, selectedId: null } })),

);

export function entitiesReducer(state: Entity_ModuleState | undefined, action: Action): Entity_ModuleState {
	return reducer(state, action);
}
