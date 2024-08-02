import { Task, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as taskActions from 'store/actions/project-task.actions';
import { Task_EntitiesState, task_initialEntitiesState } from 'store/states/project-task.state';

const reducer = createReducer(

	task_initialEntitiesState,
	on(taskActions.loadOneSuccess, (state, { id, task, syncData, remoteMetadata }): Task_EntitiesState => {

		return produce(
			state,
			draft => {

				// task
				if (task === null)
					delete draft.entities[id];
				else
					draft.entities[id] = task;

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
	on(taskActions.unloadOne, (state, { id }): Task_EntitiesState => {

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
		taskActions.loadAllSuccess, (state, { tasks, syncData, remoteMetadata }): Task_EntitiesState => ({

			...state,
			entities: tasks.reduce((record, task) => { record[task.id] = task; return record; }, {} as Record<UUID, Task>),
			syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
			remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

		})
	),
	on(taskActions.moveToTrashSuccess, (state, { id }): Task_EntitiesState => {

		return produce(
			state,
			draft => { delete draft.entities[id]; }
		);

	}),
	on(taskActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): Task_EntitiesState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	}))

);

export function task_EntitiesReducer(state: Task_EntitiesState | undefined, action: Action): Task_EntitiesState {
	return reducer(state, action);
}
