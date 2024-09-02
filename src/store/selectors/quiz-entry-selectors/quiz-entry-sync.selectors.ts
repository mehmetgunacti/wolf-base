import { AppEntityType, QuizProgress } from '@lib';
import {
	selEntityList,
	selRemoteMetadataList,
	selRemoteMetadataMap,
	selSyncDataList,
	selSyncDataMap
} from '../quiz-entry-selectors/quiz-entry-entity.selectors';
import { createSyncSelectors } from '../sync-selectors/selectors-factory';

const entityType = AppEntityType.quizEntry;

export const {

	selLocalNew,
	selLocalUpdated,
	selLocalDeleted,
	selRemoteNew,
	selRemoteUpdated,
	selRemoteDeleted,
	selLocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated,
	selCloudTasks

} = createSyncSelectors<QuizProgress>(
	entityType,
	selEntityList,
	selSyncDataList,
	selSyncDataMap,
	selRemoteMetadataList,
	selRemoteMetadataMap
);
