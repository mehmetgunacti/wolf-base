import { AppEntityType, QuizProgress } from '@lib';
import * as sel from '../entity-selectors/entity-quiz-entry.selectors';
import { createSyncSelectors } from '../sync-selectors/selectors-factory';

const entityType = AppEntityType.quizEntry;

export const {

	selLocalNew: selQuizEntry_LocalNew,
	selLocalUpdated: selQuizEntry_LocalUpdated,
	selLocalDeleted: selQuizEntry_LocalDeleted,
	selRemoteNew: selQuizEntry_RemoteNew,
	selRemoteUpdated: selQuizEntry_RemoteUpdated,
	selRemoteDeleted: selQuizEntry_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selQuizEntry_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selQuizEntry_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selQuizEntry_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selQuizEntry_LocalDeletedRemoteUpdated,
	selCloudTasks: selQuizEntry_CloudTasks

} = createSyncSelectors<QuizProgress>(
	entityType,
	sel.selQuizEntry_EntityList,
	sel.selQuizEntry_SyncDataList,
	sel.selQuizEntry_SyncDataMap,
	sel.selQuizEntry_RemoteMetadataList,
	sel.selQuizEntry_RemoteMetadataMap
);
