import { RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as contentActions from 'store/actions/note-content.actions';
import * as noteActions from 'store/actions/note.actions';
import { NoteContent_EntitiesState, noteContent_initialEntitiesState } from 'store/states/note-content.state';


const reducer = createReducer(

	noteContent_initialEntitiesState,
	on(contentActions.loadOneSuccess, (state, { id, contentAvailable, syncData, remoteMetadata }): NoteContent_EntitiesState => {

		return produce(
			state,
			draft => {

				// id
				if (contentAvailable)
					draft.ids[id] = true;
				else
					delete draft.ids[id];

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
	on(contentActions.unloadOne, (state, { id }): NoteContent_EntitiesState => {

		return produce(
			state,
			draft => {

				delete draft.ids[id];
				delete draft.syncData[id];
				delete draft.remoteMetadata[id];

			}
		);

	}),
	on(
		contentActions.loadAllSuccess, (state, { ids, syncData, remoteMetadata }): NoteContent_EntitiesState => ({

			...state,
			ids: ids.reduce((record, current) => { record[current] = true; return record; }, {} as Record<UUID, boolean>),
			syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
			remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

		})
	),
	on(contentActions.moveToTrashSuccess, (state, { id }): NoteContent_EntitiesState => {

		return produce(
			state,
			draft => { delete draft.ids[id]; }
		);

	}),
	on(contentActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): NoteContent_EntitiesState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	})),
	on(noteActions.setSelectedId, (state, { id }): NoteContent_EntitiesState => {

		return produce(
			state,
			draft => {
				if (!id)
					draft.content = null;
			}
		);

	}),
	on(contentActions.loadOneContentSuccess, (state, { content }): NoteContent_EntitiesState => ({ ...state, content }))

);

export function noteContent_EntitiesReducer(state: NoteContent_EntitiesState | undefined, action: Action): NoteContent_EntitiesState {
	return reducer(state, action);
}
