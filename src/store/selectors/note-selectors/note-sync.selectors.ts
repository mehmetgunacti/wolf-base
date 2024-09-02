import { AppEntityType, Note } from '@lib';
import {
	selEntityList,
	selRemoteMetadataList,
	selRemoteMetadataMap,
	selSyncDataList,
	selSyncDataMap
} from '../note-selectors/note-entity.selectors';
import { createSyncSelectors } from '../sync-selectors/selectors-factory';

const entityType = AppEntityType.note;

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

} = createSyncSelectors<Note>(
	entityType,
	selEntityList,
	selSyncDataList,
	selSyncDataMap,
	selRemoteMetadataList,
	selRemoteMetadataMap
);
