export interface StatsSummary {

	localNew: number;
	localUpdated: number;
	localDeleted: number;
	localTotal: number;
	localClicked: number;

	remoteNew: number;
	remoteUpdated: number;
	remoteDeleted: number;
	remoteTotal: number;

	localUpdatedRemoteUpdated: number;
	localDeletedRemoteDeleted: number;
	localUpdatedRemoteDeleted: number;
	localDeletedRemoteUpdated: number;

}