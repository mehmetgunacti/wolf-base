import { Entity, RemoteData, SyncData, SyncLog, SyncMessage } from "lib";

export interface StatsModuleState {

	selectedSyncData: SyncData | null;
	selectedRemoteData: RemoteData<Entity> | null;
	selectedItem: Entity | null;
	selectedTrashItem: Entity | null;

	conflictDialogVisible: boolean;

}

export const initialStatsState: StatsModuleState = {

	conflictDialogVisible: false,
	selectedSyncData: null,
	selectedItem:  null,
	selectedTrashItem: null,
	selectedRemoteData: null

};