import { AppEntityType, NoteContent } from '@lib';
import { createEntitySelectors } from '../entity-selectors/selectors-factory';

export const {

	selEntityState,
	selEntityMap,
	selEntityList,
	selSyncDataMap,
	selSyncDataList,
	selRemoteMetadataMap,
	selRemoteMetadataList,
	selSelectedId,
	selSelectedEntity

} = createEntitySelectors<NoteContent>(AppEntityType.noteContent);
