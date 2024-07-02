import { QuizProgress, RemoteMetadata, SyncData, UUID } from '@lib';
import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import * as quizEntryActions from 'store/actions/quiz-entry.actions';
import { QuizEntry_EntitiesState, quizEntry_initialEntitiesState } from 'store/states/quiz-entry.state';

const reducer = createReducer(

	quizEntry_initialEntitiesState,
	on(quizEntryActions.loadOneSuccess, (state, { id, quizEntry, syncData, remoteMetadata }): QuizEntry_EntitiesState => {

		return produce(
			state,
			draft => {

				// quizEntry
				if (quizEntry === null)
					delete draft.entities[id];
				else
					draft.entities[id] = quizEntry;

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
	on(quizEntryActions.unloadOne, (state, { id }): QuizEntry_EntitiesState => {

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
		quizEntryActions.loadAllSuccess, (state, { quizEntries, syncData, remoteMetadata }): QuizEntry_EntitiesState => ({

			...state,
			entities: quizEntries.reduce((record, quizEntry) => { record[quizEntry.id] = quizEntry; return record; }, {} as Record<UUID, QuizProgress>),
			syncData: syncData.reduce((record, syncData) => { record[syncData.id] = syncData; return record; }, {} as Record<UUID, SyncData>),
			remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

		})
	),
	on(quizEntryActions.moveToTrashSuccess, (state, { entry }): QuizEntry_EntitiesState => {

		return produce(
			state,
			draft => { delete draft.entities[entry.id]; }
		);

	}),
	on(quizEntryActions.loadAllRemoteMetadataSuccess, (state, { remoteMetadata }): QuizEntry_EntitiesState => ({

		...state,
		remoteMetadata: remoteMetadata.reduce((record, rmd) => { record[rmd.id] = rmd; return record; }, {} as Record<UUID, RemoteMetadata>)

	}))

);

export function quizEntry_EntitiesReducer(state: QuizEntry_EntitiesState | undefined, action: Action): QuizEntry_EntitiesState {
	return reducer(state, action);
}
