import { AppEntityType, Word } from '@lib';
import {
	selEntityList,
	selRemoteMetadataList,
	selRemoteMetadataMap,
	selSyncDataList,
	selSyncDataMap
} from '../word-selectors/word-entity.selectors';
import { createSyncSelectors } from '../sync-selectors/selectors-factory';

const entityType = AppEntityType.word;

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

} = createSyncSelectors<Word>(
	entityType,
	selEntityList,
	selSyncDataList,
	selSyncDataMap,
	selRemoteMetadataList,
	selRemoteMetadataMap
);
