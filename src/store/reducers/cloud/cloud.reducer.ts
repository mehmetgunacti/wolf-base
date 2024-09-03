import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';
import { closeConflictDialog } from 'store/actions/cloud.actions';
import { CloudModuleState, initialCloudState } from 'store/states/cloud.state';

const hideConflictDialog = (state: CloudModuleState): CloudModuleState => {

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
	)

}

export const cloudReducer: ActionReducer<CloudModuleState, Action> = createReducer(

	initialCloudState,
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
	on(closeConflictDialog, (state): CloudModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = null;
				draft.selectedEntity = null;
				draft.selectedTrashEntity = null;
				draft.selectedRemoteData = null;
				draft.conflictDialogVisible = false;

			}
		)

	})

);
