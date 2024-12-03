import { AppEntityType } from '@constants/entity.constant';
import { TestSuite } from '@models/test-suite.model';
import * as sel from '../entity/entity-test-suite.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.testSuite;

export const {

	selLocalNew: selTestSuite_LocalNew,
	selLocalUpdated: selTestSuite_LocalUpdated,
	selLocalDeleted: selTestSuite_LocalDeleted,
	selRemoteNew: selTestSuite_RemoteNew,
	selRemoteUpdated: selTestSuite_RemoteUpdated,
	selRemoteDeleted: selTestSuite_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selTestSuite_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selTestSuite_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selTestSuite_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selTestSuite_LocalDeletedRemoteUpdated,
	selCloudTasks: selTestSuite_CloudTasks

} = createSyncSelectors<TestSuite>(
	entityType,
	sel.selTestSuite_EntityList,
	sel.selTestSuite_SyncDataList,
	sel.selTestSuite_SyncDataMap,
	sel.selTestSuite_RemoteMetadataList,
	sel.selTestSuite_RemoteMetadataMap
);
