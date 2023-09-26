import { Action, createReducer, on } from '@ngrx/store';
import { search, setSelectedTags } from 'store/actions/kb-entry-tag.actions';
import { KnowledgeBaseTagsState, initialKnowledgeBaseTagsState } from 'store/states/knowledge-base.state';

const reducer = createReducer(

	initialKnowledgeBaseTagsState,

	on(search, (state, { term }): KnowledgeBaseTagsState => ({ ...state, searchTerm: term })),
	on(setSelectedTags, (state, { tags }): KnowledgeBaseTagsState => ({ ...state, selectedTags: tags })),

);

export function knowledgeBaseTagsReducer(state: KnowledgeBaseTagsState | undefined, action: Action): KnowledgeBaseTagsState {
	return reducer(state, action);
}
