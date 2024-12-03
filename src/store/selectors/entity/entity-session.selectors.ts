import { AppEntityType } from '@constants/entity.constant';
import { Session } from '@models/test-suite.model';
import { createEntitySelectors } from '../entity/selectors-factory';

export const {

	selEntityState: selSession_EntityState,
	selEntityMap: selSession_EntityMap,
	selEntityList: selSession_EntityList,
	selEntityCount: selSession_EntityCount,
	selEntityIds: selSession_EntityIds,
	selSyncDataMap: selSession_SyncDataMap,
	selSyncDataList: selSession_SyncDataList,
	selRemoteMetadataMap: selSession_RemoteMetadataMap,
	selRemoteMetadataList: selSession_RemoteMetadataList

} = createEntitySelectors<Session>(AppEntityType.session);
