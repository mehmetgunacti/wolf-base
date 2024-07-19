import { Project, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as projectActions from 'store/actions/project.actions';
import { Project_EntitiesState, project_initialEntitiesState } from 'store/states/project.state';

const reducer = createReducer(

	project_initialEntitiesState,
	on(projectActions.loadOneSuccess, (state, { id, project, syncData, remoteMetadata }): Project_EntitiesState => {

		return produce(
			state,
			draft => {

				// project
				if (project === null)
					delete draft.entities[id];
				else
					draft.entities[id] = project;

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
	on(projectActions.unloadOne, (state, { id }): Project_EntitiesState => {

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
		projectActions.loadAllSuccess, (state, { projects, syncData, remoteMetadata }): Project_EntitiesState => ({

			...state,
			entities: projects.reduce((record, project) => { record[project.id] = project; return record; }, {} as Record<UUID, Project>),
			syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
			remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

		})
	),
	on(projectActions.moveToTrashSuccess, (state, { id }): Project_EntitiesState => {

		return produce(
			state,
			draft => { delete draft.entities[id]; }
		);

	}),
	on(projectActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): Project_EntitiesState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	}))

);

export function project_EntitiesReducer(state: Project_EntitiesState | undefined, action: Action): Project_EntitiesState {
	return reducer(state, action);
}
