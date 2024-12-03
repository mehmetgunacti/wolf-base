import { cloudActions } from '@actions/cloud.actions';
import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { Cloud_ModuleState, cloud_initialState } from '@states/cloud.state';
import { produce } from 'immer';

const hideConflictDialog = (state: Cloud_ModuleState): Cloud_ModuleState => {

	return produce(
		state,
		draft => {

			draft.selectedSyncData = null;
			draft.selectedRemoteMetadata = null;
			draft.selectedEntity = null;
			draft.selectedTrashEntity = null;
			draft.selectedRemoteData = null;
			draft.conflictDialogVisible = false;
			draft.conflictDialogTitle = null;

		}
	);

};

export const cloudReducer: ActionReducer<Cloud_ModuleState, Action> = createReducer(

	cloud_initialState,
	// on(viewLocalUpdatedRemoteUpdated, hideConflictDialog),
	// on(viewLocalUpdatedRemoteUpdatedSuccess, (state, { syncData, bookmark, remoteMetadata }): CloudModuleState => {

	// 	return produce(
	// 		state,
	// 		draft => {

	// 			draft.selectedSyncData = syncData;
	// 			draft.selectedRemoteMetadata = remoteMetadata;
	// 			draft.selectedEntity = bookmark;

	// 			draft.conflictDialogVisible = true;
	// 			draft.conflictDialogTitle = 'Local Updated, Remote Updated';

	// 		}
	// 	)

	// }),
	// on(viewLocalUpdatedRemoteDeleted, hideConflictDialog),
	// on(viewLocalUpdatedRemoteDeletedSuccess, (state, { syncData, bookmark }): CloudModuleState => {

	// 	return produce(
	// 		state,
	// 		draft => {

	// 			draft.selectedSyncData = syncData;
	// 			draft.selectedEntity = bookmark;

	// 			draft.conflictDialogVisible = true;
	// 			draft.conflictDialogTitle = 'Local Updated, Remote Deleted';

	// 		}
	// 	)

	// }),
	// on(viewLocalDeletedRemoteUpdated, hideConflictDialog),
	// on(viewLocalDeletedRemoteUpdatedSuccess, (state, { syncData, trashItem, remoteMetadata }): CloudModuleState => {

	// 	return produce(
	// 		state,
	// 		draft => {

	// 			draft.selectedSyncData = syncData;
	// 			draft.selectedRemoteMetadata = remoteMetadata;
	// 			draft.selectedTrashEntity = trashItem;

	// 			draft.conflictDialogVisible = true;
	// 			draft.conflictDialogTitle = 'Local Deleted, Remote Updated';

	// 		}
	// 	)

	// }),
	// on(loadEntitySuccess, (state, { entity }): CloudModuleState => ({ ...state, selectedEntity: entity })),
	// on(loadTrashEntitySuccess, (state, { entity }): CloudModuleState => ({ ...state, selectedTrashEntity: entity })),
	// on(downloadRemoteDataSuccess, (state, { remoteData }): CloudModuleState => ({ ...state, selectedRemoteData: remoteData })),
	on(cloudActions.closeConflictDialog, (state): Cloud_ModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = null;
				draft.selectedEntity = null;
				draft.selectedTrashEntity = null;
				draft.selectedRemoteData = null;
				draft.conflictDialogVisible = false;

			}
		);

	})

);
