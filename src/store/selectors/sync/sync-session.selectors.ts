import { AppEntityType } from '@constants/entity.constant';
import { Session } from '@models/test-suite.model';
import * as sel from '../entity/entity-session.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.session;

export const {

	selLocalNew: selSession_LocalNew,
	selLocalUpdated: selSession_LocalUpdated,
	selLocalDeleted: selSession_LocalDeleted,
	selRemoteNew: selSession_RemoteNew,
	selRemoteUpdated: selSession_RemoteUpdated,
	selRemoteDeleted: selSession_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selSession_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selSession_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selSession_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selSession_LocalDeletedRemoteUpdated,
	selCloudTasks: selSession_CloudTasks

} = createSyncSelectors<Session>(
	entityType,
	sel.selSession_EntityList,
	sel.selSession_SyncDataList,
	sel.selSession_SyncDataMap,
	sel.selSession_RemoteMetadataList,
	sel.selSession_RemoteMetadataMap
);
