import { Entity } from '@models/entity.model';
import { RemoteData, RemoteMetadata } from '@models/remote.model';
import { SyncData } from '@models/sync.model';

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
	selectedEntity: null,
	selectedTrashEntity: null,
	selectedRemoteData: null,

	conflictDialogVisible: false,
	conflictDialogTitle: null

};
