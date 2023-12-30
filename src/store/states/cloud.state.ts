import { Entity, RemoteData, RemoteMetadata, SyncData } from "@lib";

export interface CloudModuleState {

	selectedEntity: Entity | null;
	selectedSyncData: SyncData | null;
	selectedRemoteMetadata: RemoteMetadata | null;
	selectedRemoteData: RemoteData<Entity> | null;
	selectedTrashEntity: Entity | null;

	conflictDialogVisible: boolean;
	conflictDialogTitle: string | null;

}

export const initialCloudState: CloudModuleState = {

	selectedSyncData: null,
	selectedRemoteMetadata: null,
	selectedEntity:  null,
	selectedTrashEntity: null,
	selectedRemoteData: null,

	conflictDialogVisible: false,
	conflictDialogTitle: null

};
