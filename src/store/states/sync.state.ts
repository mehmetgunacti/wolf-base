import { Entity, RemoteData, SyncData, SyncLog } from "lib";

export interface SyncModuleState {

	inProgress: boolean;
	syncLogs: SyncLog[];
	selectedSyncData: SyncData | null;
	selectedItem: Entity | null;
	selectedTrashItem: Entity | null;
	selectedRemoteData: RemoteData<Entity> | null;
	conflictDialogVisible: boolean;
	syncDialogVisible: boolean;

}

export const initialSyncState: SyncModuleState = {

	inProgress: false,
	syncLogs: [],
	conflictDialogVisible: false,
	syncDialogVisible: false,
	selectedSyncData: null,
	selectedItem:  null,
	selectedTrashItem: null,
	selectedRemoteData: null

};