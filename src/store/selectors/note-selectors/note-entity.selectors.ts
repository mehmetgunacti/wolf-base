import { AppEntityType, Note } from '@lib';
import { createEntitySelectors } from '../entity-selectors/selectors-factory';

export const {

	selEntityState,
	selEntityMap,
	selEntityList,
	selSyncDataMap,
	selSyncDataList,
	selRemoteMetadataMap,
	selRemoteMetadataList

} = createEntitySelectors<Note>(AppEntityType.note);

