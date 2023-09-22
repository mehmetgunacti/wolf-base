import { Action, createReducer, on } from '@ngrx/store';
import { KBEntry, UUID } from 'lib';
import { createKBentrySuccess, loadAllKBEntriesSuccess, updateKBEntrySuccess } from 'store/actions/knowledge-base.actions';
import { KnowledgeBaseEntitiesState, initialKnowledgeBaseEntitiesState } from 'store/states/knowledge-base.state';

const reducer = createReducer(

	initialKnowledgeBaseEntitiesState,

	on(
		loadAllKBEntriesSuccess, (state, { kbEntries }): KnowledgeBaseEntitiesState => {

			// create a dictionary for lookup...
			const entities = kbEntries.reduce((record, entry) => { record[entry.id] = entry; return record; }, {} as Record<UUID, KBEntry>);

			// iterate over entries list
			// set entry's "parent", add entry to parent's "entries" array
			kbEntries.forEach(e => {

				if (e.parentId) {

					// lookup
					const parent = entities[e.parentId];
					// set parent
					e.parent = parent;
					// add to "entries" of parent
					parent.entries.push(e);

				}

			});
			return { ...state, entities };

		}
	),
	on(createKBentrySuccess, (state): KnowledgeBaseEntitiesState => ({ ...state, selected: null })),
	on(updateKBEntrySuccess, (state): KnowledgeBaseEntitiesState => ({ ...state, selected: null }))

);

export function knowledgeBaseEntitiesReducer(state: KnowledgeBaseEntitiesState | undefined, action: Action): KnowledgeBaseEntitiesState {
	return reducer(state, action);
}
