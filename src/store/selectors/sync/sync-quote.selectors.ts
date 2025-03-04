import { AppEntityType } from '@constants/entity.constant';
import { Quote } from '@models/quote.model';
import * as sel from '../entity/entity-quote.selectors';
import { createSyncSelectors } from '../sync/selectors-factory';

const entityType = AppEntityType.quote;

export const {

	selLocalNew: selQuote_LocalNew,
	selLocalUpdated: selQuote_LocalUpdated,
	selLocalDeleted: selQuote_LocalDeleted,
	selRemoteNew: selQuote_RemoteNew,
	selRemoteUpdated: selQuote_RemoteUpdated,
	selRemoteDeleted: selQuote_RemoteDeleted,
	selLocalUpdatedRemoteUpdated: selQuote_LocalUpdatedRemoteUpdated,
	selLocalDeletedRemoteDeleted: selQuote_LocalDeletedRemoteDeleted,
	selLocalUpdatedRemoteDeleted: selQuote_LocalUpdatedRemoteDeleted,
	selLocalDeletedRemoteUpdated: selQuote_LocalDeletedRemoteUpdated,
	selCloudTasks: selQuote_CloudTasks

} = createSyncSelectors<Quote>(
	entityType,
	sel.selQuote_EntityList,
	sel.selQuote_SyncDataList,
	sel.selQuote_SyncDataMap,
	sel.selQuote_RemoteMetadataList,
	sel.selQuote_RemoteMetadataMap
);
