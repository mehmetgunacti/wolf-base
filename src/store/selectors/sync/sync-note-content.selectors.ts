import { AppEntityType } from '@constants/entity.constant';
import { NoteContent } from '@models/note.model';
import * as sel from '../entity/entity-note-content.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.noteContent;

export const {

	selLocalNew: selNoteContent_LocalNew,
	selLocalUpdated: selNoteContent_LocalUpdated,
	selLocalDeleted: selNoteContent_LocalDeleted,
	selRemoteNew: selNoteContent_RemoteNew,
	selRemoteUpdated: selNoteContent_RemoteUpdated,
	selRemoteDeleted: selNoteContent_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selNoteContent_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selNoteContent_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selNoteContent_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selNoteContent_LocalDeletedRemoteUpdated,
	selCloudTasks: selNoteContent_CloudTasks

} = createSyncSelectors<NoteContent>(
	entityType,
	sel.selNoteContent_EntityList,
	sel.selNoteContent_SyncDataList,
	sel.selNoteContent_SyncDataMap,
	sel.selNoteContent_RemoteMetadataList,
	sel.selNoteContent_RemoteMetadataMap
);
