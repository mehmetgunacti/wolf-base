import { AppEntityType } from '@constants/entity.constant';
import { Quote } from '@models/quote.model';
import { createEntitySelectors } from '../entity/selectors-factory';

export const {

	selEntityState: selQuote_EntityState,
	selEntityMap: selQuote_EntityMap,
	selEntityList: selQuote_EntityList,
	selEntityCount: selQuote_EntityCount,
	selEntityIds: selQuote_EntityIds,
	selSyncDataMap: selQuote_SyncDataMap,
	selSyncDataList: selQuote_SyncDataList,
	selRemoteMetadataMap: selQuote_RemoteMetadataMap,
	selRemoteMetadataList: selQuote_RemoteMetadataList

} = createEntitySelectors<Quote>(AppEntityType.quote);
