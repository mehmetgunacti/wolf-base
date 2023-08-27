import { Entity, RemoteData, SyncData } from "lib";

export interface StatsModuleState {

	selectedEntity: Entity | null;
	selectedSyncData: SyncData | null;
	selectedRemoteData: RemoteData<Entity> | null;
	selectedTrashEntity: Entity | null;

	conflictDialogVisible: boolean;

}

export const initialStatsState: StatsModuleState = {

	selectedSyncData: null,
	selectedEntity:  null,
	selectedTrashEntity: null,
	selectedRemoteData: null,
	
	conflictDialogVisible: false

};