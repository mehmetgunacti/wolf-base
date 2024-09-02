import { AppEntityType, Bookmark } from '@lib';
import { createEntitySelectors } from '../entity-selectors/selectors-factory';

export const {

	selEntityState,
	selEntityMap,
	selEntityList,
	selEntityIds,
	selEntityCount,
	selSyncDataMap,
	selSyncDataList,
	selRemoteMetadataMap,
	selRemoteMetadataList,
	selSelectedId,
	selSelectedEntity

} = createEntitySelectors<Bookmark>(AppEntityType.bookmark);
