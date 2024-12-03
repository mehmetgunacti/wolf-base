import { AppEntityType } from '@constants/entity.constant';
import { Exam } from '@models/test-suite.model';
import * as sel from '../entity/entity-exam.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.session;

export const {

	selLocalNew: selExam_LocalNew,
	selLocalUpdated: selExam_LocalUpdated,
	selLocalDeleted: selExam_LocalDeleted,
	selRemoteNew: selExam_RemoteNew,
	selRemoteUpdated: selExam_RemoteUpdated,
	selRemoteDeleted: selExam_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selExam_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selExam_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selExam_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selExam_LocalDeletedRemoteUpdated,
	selCloudTasks: selExam_CloudTasks

} = createSyncSelectors<Exam>(
	entityType,
	sel.selExam_EntityList,
	sel.selExam_SyncDataList,
	sel.selExam_SyncDataMap,
	sel.selExam_RemoteMetadataList,
	sel.selExam_RemoteMetadataMap
);
