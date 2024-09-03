import { AppEntityType, QuizProgress } from '@lib';
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
	selRemoteMetadataList

} = createEntitySelectors<QuizProgress>(AppEntityType.quizEntry);
