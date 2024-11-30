import { AppEntityType } from '@constants/entity.constant';
import { TestSuite } from '@models/test-suite.model';
import { createEntitySelectors } from '../entity/selectors-factory';

export const {

	selEntityState: selTestSuite_EntityState,
	selEntityMap: selTestSuite_EntityMap,
	selEntityList: selTestSuite_EntityList,
	selEntityCount: selTestSuite_EntityCount,
	selEntityIds: selTestSuite_EntityIds,
	selSyncDataMap: selTestSuite_SyncDataMap,
	selSyncDataList: selTestSuite_SyncDataList,
	selRemoteMetadataMap: selTestSuite_RemoteMetadataMap,
	selRemoteMetadataList: selTestSuite_RemoteMetadataList

} = createEntitySelectors<TestSuite>(AppEntityType.testSuite);
