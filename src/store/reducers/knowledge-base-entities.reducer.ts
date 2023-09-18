import { Action, createReducer, on } from '@ngrx/store';
import { KBEntry, UUID } from 'lib';
import { createBookmarkSuccess, updateBookmarkSuccess } from 'store/actions/bookmark.actions';
import { createKBentrySuccess, loadAllKBEntriesSuccess, updateKBEntrySuccess } from 'store/actions/knowledge-base.actions';
import { KnowledgeBaseEntitiesState, initialKnowledgeBaseEntitiesState } from 'store/states/knowledge-base.state';

const reducer = createReducer(

	initialKnowledgeBaseEntitiesState,

	on(
		loadAllKBEntriesSuccess, (state, { entries }): KnowledgeBaseEntitiesState => ({
			...state,
			entities: entries.reduce((record, entry) => { record[entry.id] = entry; return record; }, {} as Record<UUID, KBEntry>)
		})
	),
	on(createKBentrySuccess, (state): KnowledgeBaseEntitiesState => ({ ...state, selected: null })),
	on(updateKBEntrySuccess, (state): KnowledgeBaseEntitiesState => ({ ...state, selected: null }))

);

export function knowledgeBaseEntitiesReducer(state: KnowledgeBaseEntitiesState | undefined, action: Action): KnowledgeBaseEntitiesState {
	return reducer(state, action);
}
