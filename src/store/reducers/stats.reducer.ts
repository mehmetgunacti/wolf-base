import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import produce from 'immer';
import { downloadRemoteDataSuccess, loadEntitySuccess, loadTrashEntitySuccess, viewLocalDeletedRemoteUpdated, viewLocalDeletedRemoteUpdatedSuccess, viewLocalUntouchedRemoteDeleted, viewLocalUntouchedRemoteDeletedSuccess, viewLocalUntouchedRemoteUpdated, viewLocalUntouchedRemoteUpdatedSuccess, viewLocalUpdatedRemoteDeleted, viewLocalUpdatedRemoteDeletedSuccess, viewLocalUpdatedRemoteUpdated, viewLocalUpdatedRemoteUpdatedSuccess } from 'store/actions/stats-bookmark.actions';
import { closeConflictDialog } from 'store/actions/stats.actions';
import { StatsModuleState, initialStatsState } from 'store/states/stats.state';

const hideConflictDialog = (state: StatsModuleState): StatsModuleState => {

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

export const statsReducer: ActionReducer<StatsModuleState, Action> = createReducer(

	initialStatsState,
	on(viewLocalUntouchedRemoteDeleted, hideConflictDialog),
	on(viewLocalUntouchedRemoteDeletedSuccess, (state, { syncData, bookmark }): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = syncData;
				draft.selectedEntity = bookmark;

				draft.conflictDialogVisible = true;
				draft.conflictDialogTitle = 'Local Untouched, Remote Deleted';

			}
		)

	}),
	on(viewLocalUntouchedRemoteUpdated, hideConflictDialog),
	on(viewLocalUntouchedRemoteUpdatedSuccess, (state, { syncData, bookmark, remoteMetadata }): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = syncData;
				draft.selectedRemoteMetadata = remoteMetadata;
				draft.selectedEntity = bookmark;

				draft.conflictDialogVisible = true;
				draft.conflictDialogTitle = 'Local Untouched, Remote Updated';

			}
		)

	}),
	on(viewLocalUpdatedRemoteUpdated, hideConflictDialog),
	on(viewLocalUpdatedRemoteUpdatedSuccess, (state, { syncData, bookmark, remoteMetadata }): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = syncData;
				draft.selectedRemoteMetadata = remoteMetadata;
				draft.selectedEntity = bookmark;

				draft.conflictDialogVisible = true;
				draft.conflictDialogTitle = 'Local Updated, Remote Updated';

			}
		)

	}),
	on(viewLocalUpdatedRemoteDeleted, hideConflictDialog),
	on(viewLocalUpdatedRemoteDeletedSuccess, (state, { syncData, bookmark }): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = syncData;
				draft.selectedEntity = bookmark;

				draft.conflictDialogVisible = true;
				draft.conflictDialogTitle = 'Local Updated, Remote Deleted';

			}
		)

	}),
	on(viewLocalDeletedRemoteUpdated, hideConflictDialog),
	on(viewLocalDeletedRemoteUpdatedSuccess, (state, { syncData, trashItem, remoteMetadata }): StatsModuleState => {

		return produce(
			state,
			draft => {

				draft.selectedSyncData = syncData;
				draft.selectedRemoteMetadata = remoteMetadata;
				draft.selectedTrashEntity = trashItem;

				draft.conflictDialogVisible = true;
				draft.conflictDialogTitle = 'Local Deleted, Remote Updated';

			}
		)

	}),
	on(loadEntitySuccess, (state, { entity }): StatsModuleState => ({ ...state, selectedEntity: entity })),
	on(loadTrashEntitySuccess, (state, { entity }): StatsModuleState => ({ ...state, selectedTrashEntity: entity })),
	on(downloadRemoteDataSuccess, (state, { remoteData }): StatsModuleState => ({ ...state, selectedRemoteData: remoteData })),
	on(closeConflictDialog, (state): StatsModuleState => {

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
