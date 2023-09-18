import { createFeatureSelector, createSelector } from '@ngrx/store';
import { KnowledgeBaseModuleState } from 'store/states/knowledge-base.state';

const selKnowledgeBaseModuleState = createFeatureSelector<KnowledgeBaseModuleState>('bookmark');

export const selKnowledgeBaseEntitiesState = createSelector(

	selKnowledgeBaseModuleState,
	state => state.entities

);

export const selKnowledgeBaseUIState = createSelector(

	selKnowledgeBaseModuleState,
	state => state.ui

);

export const selKnowledgeBaseTagsState = createSelector(

	selKnowledgeBaseModuleState,
	state => state.tags

);

export const selKnowledgeBaseSyncState = createSelector(

	selKnowledgeBaseModuleState,
	state => state.sync

);