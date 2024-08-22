import { Entity } from '@lib';
import { Action, createReducer } from '@ngrx/store';
import { Entity_EntitiesState, entity_initialState, Entity_ModuleState } from 'store/states/entity.state';

const reducer = createReducer(

	entity_initialState,
	// on(noteActions.loadOneSuccess, (state, { id, note, syncData, remoteMetadata }): Entity_EntitiesState<Entity> => {

	// 	return produce(
	// 		state,
	// 		draft => {

	// 			// note
	// 			if (note === null)
	// 				delete draft.entities[id];
	// 			else
	// 				draft.entities[id] = note;

	// 			// syncData
	// 			if (syncData === null)
	// 				delete draft.syncData[id];
	// 			else
	// 				draft.syncData[id] = syncData;

	// 			// remoteMetadata
	// 			if (remoteMetadata === null)
	// 				delete draft.remoteMetadata[id];
	// 			else
	// 				draft.remoteMetadata[id] = remoteMetadata;

	// 		}
	// 	);

	// }),
	// on(noteActions.unloadOne, (state, { id }): Note_EntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {

	// 			delete draft.entities[id];
	// 			delete draft.syncData[id];
	// 			delete draft.remoteMetadata[id];

	// 		}
	// 	);

	// }),
	// on(
	// 	noteActions.loadAllSuccess, (state, { notes, syncData, remoteMetadata }): Note_EntitiesState => ({

	// 		...state,
	// 		entities: notes.reduce((record, note) => { record[note.id] = note; return record; }, {} as Record<UUID, Note>),
	// 		syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
	// 		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	// 	})
	// ),
	// on(noteActions.moveToTrashSuccess, (state, { id }): Note_EntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => { delete draft.entities[id]; }
	// 	);

	// }),
	// on(noteActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): Note_EntitiesState => ({

	// 	...state,
	// 	remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	// })),
	// on(noteActions.setSelectedId, (state, { id }): Note_EntitiesState => {

	// 	return produce(
	// 		state,
	// 		draft => {
	// 			draft.selectedId = id;
	// 		}
	// 	);

	// })

);

// export const cloudReducer: ActionReducer<CloudModuleState, Action> = createReducer(

export function entitiesReducer(state: Entity_ModuleState | undefined, action: Action): Entity_ModuleState {
	return reducer(state, action);
}
