import { AppEntityType, NoteContent } from '@lib';
import { createEntitySelectors } from '../entity-selectors/selectors-factory';

export const {

	selEntityState: selNoteContent_EntityState,
	selEntityMap: selNoteContent_EntityMap,
	selEntityList: selNoteContent_EntityList,
	selEntityCount: selNoteContent_EntityCount,
	selEntityIds: selNoteContent_EntityIds,
	selSyncDataMap: selNoteContent_SyncDataMap,
	selSyncDataList: selNoteContent_SyncDataList,
	selRemoteMetadataMap: selNoteContent_RemoteMetadataMap,
	selRemoteMetadataList: selNoteContent_RemoteMetadataList

} = createEntitySelectors<NoteContent>(AppEntityType.noteContent);
