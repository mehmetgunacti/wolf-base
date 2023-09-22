import { createSelector } from '@ngrx/store';
import { selKnowledgeBaseEntitiesState } from './knowledge-base.selectors';
import { KBEntry, UUID } from 'lib';

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

export const selKBRootEntriesArray = createSelector(

	selKBEntriesArray,
	entries => entries.filter(e => e.parent === null)

);

export const selKnowledgeBaseCount = createSelector(

	selKnowledgeBaseIds,
	ids => ids.length

);

export const selKBEntrySelected = createSelector(

	selKnowledgeBaseEntitiesState,
	state => state.selected

);

export const selKBEntrySelectedEntry = createSelector(

	selKBEntries,
	selKBEntrySelected,
	(entries, id) => id ? entries[id] : null

);

export const selKBEntryContent = createSelector(

	selKnowledgeBaseEntitiesState,
	state => state.content

);