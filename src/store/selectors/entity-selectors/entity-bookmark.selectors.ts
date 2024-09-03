import { AppEntityType, Bookmark } from '@lib';
import { createEntitySelectors } from '../entity-selectors/selectors-factory';

export const {

	selEntityState: selBookmark_EntityState,
	selEntityMap: selBookmark_EntityMap,
	selEntityList: selBookmark_EntityList,
	selEntityCount: selBookmark_EntityCount,
	selEntityIds: selBookmark_EntityIds,
	selSyncDataMap: selBookmark_SyncDataMap,
	selSyncDataList: selBookmark_SyncDataList,
	selRemoteMetadataMap: selBookmark_RemoteMetadataMap,
	selRemoteMetadataList: selBookmark_RemoteMetadataList

} = createEntitySelectors<Bookmark>(AppEntityType.bookmark);
