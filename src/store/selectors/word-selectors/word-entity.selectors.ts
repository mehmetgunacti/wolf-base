import { AppEntityType, Word } from '@lib';
import { createSelector } from '@ngrx/store';
import { createEntitySelectors } from '../entity-selectors/selectors-factory';
import { selWord_UIState } from './word.selectors';

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

} = createEntitySelectors<Word>(AppEntityType.word);

export const selWord_search = createSelector(

	selWord_UIState,
	state => state.queryParams.search

);

export const selWord_filtered = createSelector(

	selEntityList,
	selWord_search,
	(arr, search) => search !== null ? arr.filter(word => word.name.toLocaleLowerCase().includes(search.toLowerCase())) : arr

);
