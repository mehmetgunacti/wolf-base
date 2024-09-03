import { createSelector } from '@ngrx/store';
import { selEntityList, selEntityMap } from './word-entity.selectors';
import { selWord_UIState } from './word.selectors';

// SELECTED ID
const selWord_SelectedId = createSelector(

	selWord_UIState,
	state => state.selectedId

);

export const selWord_SelectedEntity = createSelector(

	selEntityMap,
	selWord_SelectedId,
	(map, id) => id ? map[id] : null

);

export const selWord_search = createSelector(

	selWord_UIState,
	state => state.queryParams.search

);

export const selWord_filtered = createSelector(

	selEntityList,
	selWord_search,
	(arr, search) => search !== null ? arr.filter(word => word.name.toLocaleLowerCase().includes(search.toLowerCase())) : arr

);
