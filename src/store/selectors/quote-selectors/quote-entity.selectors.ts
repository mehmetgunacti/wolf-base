import { AppEntityType, Quote } from '@lib';
import { createEntitySelectors } from '../entity-selectors/selectors-factory';

export const {

	selEntityState,
	selEntityMap,
	selEntityList,
	selEntityIds,
	selSyncDataMap,
	selSyncDataList,
	selRemoteMetadataMap,
	selRemoteMetadataList,
	selSelectedId,
	selSelectedEntity

} = createEntitySelectors<Quote>(AppEntityType.quote);
