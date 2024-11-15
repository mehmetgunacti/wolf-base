import { AppEntityType } from '@constants/entity.constant';
import { Note } from '@models/note.model';
import * as sel from '../entity/entity-note.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.note;

export const {

	selLocalNew: selNote_LocalNew,
	selLocalUpdated: selNote_LocalUpdated,
	selLocalDeleted: selNote_LocalDeleted,
	selRemoteNew: selNote_RemoteNew,
	selRemoteUpdated: selNote_RemoteUpdated,
	selRemoteDeleted: selNote_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selNote_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selNote_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selNote_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selNote_LocalDeletedRemoteUpdated,
	selCloudTasks: selNote_CloudTasks

} = createSyncSelectors<Note>(
	entityType,
	sel.selNote_EntityList,
	sel.selNote_SyncDataList,
	sel.selNote_SyncDataMap,
	sel.selNote_RemoteMetadataList,
	sel.selNote_RemoteMetadataMap
);
