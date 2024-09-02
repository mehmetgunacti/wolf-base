import { AppEntityType, Bookmark } from '@lib';
import {
	selEntityList,
	selRemoteMetadataList,
	selRemoteMetadataMap,
	selSyncDataList,
	selSyncDataMap
} from '../bookmark-selectors/bookmark-entity.selectors';
import { createSyncSelectors } from '../sync-selectors/selectors-factory';

const entityType = AppEntityType.bookmark;

export const {

	selLocalNew,
	selLocalUpdated,
	selLocalDeleted,
	selRemoteNew,
	selRemoteUpdated,
	selRemoteDeleted,
	selLocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated,
	selCloudTasks

} = createSyncSelectors<Bookmark>(
	entityType,
	selEntityList,
	selSyncDataList,
	selSyncDataMap,
	selRemoteMetadataList,
	selRemoteMetadataMap
);
