import { AppEntityType } from '@constants';
import { QuizEntry } from '@models';
import { createEntitySelectors } from '../entity/selectors-factory';

export const {

	selEntityState: selQuizEntry_EntityState,
	selEntityMap: selQuizEntry_EntityMap,
	selEntityList: selQuizEntry_EntityList,
	selEntityCount: selQuizEntry_EntityCount,
	selEntityIds: selQuizEntry_EntityIds,
	selSyncDataMap: selQuizEntry_SyncDataMap,
	selSyncDataList: selQuizEntry_SyncDataList,
	selRemoteMetadataMap: selQuizEntry_RemoteMetadataMap,
	selRemoteMetadataList: selQuizEntry_RemoteMetadataList

} = createEntitySelectors<QuizEntry>(AppEntityType.quizEntry);
