import { createSelector } from '@ngrx/store';
import { selKnowledgeBaseEntitiesState } from './knowledge-base.selectors';

export const selKBEntries = createSelector(

	selKnowledgeBaseEntitiesState,
	entities => entities.entities

);

export const selKnowledgeBaseIds = createSelector(

	selKnowledgeBaseEntitiesState,
	state => Object.keys(state.entities)

);

export const selKBEntriesArray = createSelector(

	selKnowledgeBaseEntitiesState,
	state => Object.values(state.entities)

);

export const selKnowledgeBaseCount = createSelector(

	selKnowledgeBaseIds,
	ids => ids.length

);

export const selKBEntrySelected = createSelector(

	selKnowledgeBaseEntitiesState,
	state => state.selected ? state.entities[state.selected] : null

);

export const selKBEntryContent = createSelector(

	selKnowledgeBaseEntitiesState,
	state => state.content

);