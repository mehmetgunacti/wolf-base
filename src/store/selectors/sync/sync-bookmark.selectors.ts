import { AppEntityType, Bookmark } from '@lib';
import * as sel from '../entity/entity-bookmark.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.bookmark;

export const {

	selLocalNew: selBookmark_LocalNew,
	selLocalUpdated: selBookmark_LocalUpdated,
	selLocalDeleted: selBookmark_LocalDeleted,
	selRemoteNew: selBookmark_RemoteNew,
	selRemoteUpdated: selBookmark_RemoteUpdated,
	selRemoteDeleted: selBookmark_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selBookmark_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selBookmark_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selBookmark_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selBookmark_LocalDeletedRemoteUpdated,
	selCloudTasks: selBookmark_CloudTasks

} = createSyncSelectors<Bookmark>(
	entityType,
	sel.selBookmark_EntityList,
	sel.selBookmark_SyncDataList,
	sel.selBookmark_SyncDataMap,
	sel.selBookmark_RemoteMetadataList,
	sel.selBookmark_RemoteMetadataMap
);
