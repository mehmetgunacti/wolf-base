import { Note, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as noteActions from 'store/actions/note.actions';
import { Note_EntitiesState, note_initialEntitiesState } from 'store/states/note.state';

const reducer = createReducer(

	note_initialEntitiesState,
	// on(noteActions.loadOneSuccess, (state, { id, note, syncData, remoteMetadata }): Note_EntitiesState => {

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
	on(noteActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): Note_EntitiesState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	}))

);

export function note_EntitiesReducer(state: Note_EntitiesState | undefined, action: Action): Note_EntitiesState {
	return reducer(state, action);
}
