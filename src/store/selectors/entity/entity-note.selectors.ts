import { AppEntityType } from '@constants';
import { Note } from '@models';
import { createEntitySelectors } from '../entity/selectors-factory';

export const {

	selEntityState: selNote_EntityState,
	selEntityMap: selNote_EntityMap,
	selEntityList: selNote_EntityList,
	selEntityCount: selNote_EntityCount,
	selEntityIds: selNote_EntityIds,
	selSyncDataMap: selNote_SyncDataMap,
	selSyncDataList: selNote_SyncDataList,
	selRemoteMetadataMap: selNote_RemoteMetadataMap,
	selRemoteMetadataList: selNote_RemoteMetadataList

} = createEntitySelectors<Note>(AppEntityType.note);
