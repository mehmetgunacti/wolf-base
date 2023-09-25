import { Action, createReducer, on } from '@ngrx/store';
import { createEntitySuccess, loadAllEntitiesSuccess, removeSelected, setSelected, updateEntitySuccess } from 'store/actions/kb-entry-entity.actions';
import { KnowledgeBaseEntitiesState, initialKnowledgeBaseEntitiesState } from 'store/states/knowledge-base.state';

const reducer = createReducer(

	initialKnowledgeBaseEntitiesState,

	on(loadAllEntitiesSuccess, (state, { entries }): KnowledgeBaseEntitiesState => ({ ...state, entries })),
	on(createEntitySuccess, (state): KnowledgeBaseEntitiesState => ({ ...state, selected: null })),
	on(updateEntitySuccess, (state): KnowledgeBaseEntitiesState => ({ ...state, selected: null })),
	on(setSelected, (state, { id }): KnowledgeBaseEntitiesState => ({ ...state, selected: id })),
	on(removeSelected, (state): KnowledgeBaseEntitiesState => ({ ...state, selected: null })),

);

export function knowledgeBaseEntitiesReducer(state: KnowledgeBaseEntitiesState | undefined, action: Action): KnowledgeBaseEntitiesState {
	return reducer(state, action);
}
