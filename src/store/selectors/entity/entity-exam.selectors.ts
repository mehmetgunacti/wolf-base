import { AppEntityType } from '@constants/entity.constant';
import { Exam } from '@models/test-suite.model';
import { createEntitySelectors } from '../entity/selectors-factory';

export const {

	selEntityState: selExam_EntityState,
	selEntityMap: selExam_EntityMap,
	selEntityList: selExam_EntityList,
	selEntityCount: selExam_EntityCount,
	selEntityIds: selExam_EntityIds,
	selSyncDataMap: selExam_SyncDataMap,
	selSyncDataList: selExam_SyncDataList,
	selRemoteMetadataMap: selExam_RemoteMetadataMap,
	selRemoteMetadataList: selExam_RemoteMetadataList

} = createEntitySelectors<Exam>(AppEntityType.exam);
