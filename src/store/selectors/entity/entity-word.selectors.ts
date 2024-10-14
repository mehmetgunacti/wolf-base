import { AppEntityType } from '@constants';
import { Word } from '@models';
import { createEntitySelectors } from '../entity/selectors-factory';

export const {

	selEntityState: selWord_EntityState,
	selEntityMap: selWord_EntityMap,
	selEntityList: selWord_EntityList,
	selEntityCount: selWord_EntityCount,
	selEntityIds: selWord_EntityIds,
	selSyncDataMap: selWord_SyncDataMap,
	selSyncDataList: selWord_SyncDataList,
	selRemoteMetadataMap: selWord_RemoteMetadataMap,
	selRemoteMetadataList: selWord_RemoteMetadataList

} = createEntitySelectors<Word>(AppEntityType.word);
