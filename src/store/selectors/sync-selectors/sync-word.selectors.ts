import { AppEntityType, Word } from '@lib';
import * as sel from '../entity-selectors/entity-word.selectors';
import { createSyncSelectors } from '../sync-selectors/selectors-factory';

const entityType = AppEntityType.word;

export const {

	selLocalNew: selWord_LocalNew,
	selLocalUpdated: selWord_LocalUpdated,
	selLocalDeleted: selWord_LocalDeleted,
	selRemoteNew: selWord_RemoteNew,
	selRemoteUpdated: selWord_RemoteUpdated,
	selRemoteDeleted: selWord_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selWord_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selWord_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selWord_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selWord_LocalDeletedRemoteUpdated,
	selCloudTasks: selWord_CloudTasks

} = createSyncSelectors<Word>(
	entityType,
	sel.selWord_EntityList,
	sel.selWord_SyncDataList,
	sel.selWord_SyncDataMap,
	sel.selWord_RemoteMetadataList,
	sel.selWord_RemoteMetadataMap
);
