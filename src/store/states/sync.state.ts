import { Entity, RemoteData, SyncData, SyncLog, SyncMessage } from "lib";

export interface SyncModuleState {

	inProgress: boolean;
	syncLogs: SyncLog[];
	syncMessages: SyncMessage[];
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
	syncMessages: [],
	conflictDialogVisible: false,
	syncDialogVisible: false,
	selectedSyncData: null,
	selectedItem:  null,
	selectedTrashItem: null,
	selectedRemoteData: null

};