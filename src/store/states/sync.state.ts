import { Entity, RemoteData, SyncData } from "lib";

export interface SyncModuleState {

	inProgress: boolean;
	messages: string[];
	selectedSyncData: SyncData | null;
	selectedItem: Entity | null;
	selectedTrashItem: Entity | null;
	selectedRemoteData: RemoteData<Entity> | null;
	conflictDialogVisible: boolean;
	syncDialogVisible: boolean;

}

export const initialSyncState: SyncModuleState = {

	inProgress: false,
	messages: [],
	conflictDialogVisible: false,
	syncDialogVisible: false,
	selectedSyncData: null,
	selectedItem:  null,
	selectedTrashItem: null,
	selectedRemoteData: null

};