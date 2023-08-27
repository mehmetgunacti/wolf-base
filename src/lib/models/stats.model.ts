import { UUID } from "lib/constants";
import { SyncData } from "./sync.model";
import { Click } from "./bookmark.model";
import { RemoteMetadata } from "./remote.model";

export interface StatsSummary {

	localNew: UUID[];
	localUpdated: SyncData[];
	localDeleted: SyncData[];
	localTotal: UUID[];
	localClicked: Click[];

	remoteNew: RemoteMetadata[];
	remoteUpdated: RemoteMetadata[];
	remoteDeleted: RemoteMetadata[];
	remoteTotal: RemoteMetadata[];

	localUpdatedRemoteUpdated: SyncData[];
	localDeletedRemoteDeleted: SyncData[];
	localUpdatedRemoteDeleted: SyncData[];
	localDeletedRemoteUpdated: SyncData[];

}