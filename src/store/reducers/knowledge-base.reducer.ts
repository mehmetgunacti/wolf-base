import { ActionReducerMap } from "@ngrx/store";
import { KnowledgeBaseModuleState } from "store/states/knowledge-base.state";
import { knowledgeBaseEntitiesReducer } from "./knowledge-base-entities.reducer";
import { knowledgeBaseSyncReducer } from "./knowledge-base-sync.reducer";
import { knowledgeBaseTagsReducer } from "./knowledge-base-tags.reducer";
import { knowledgeBaseUIReducer } from "./knowledge-base-ui.reducer";

export const knowledgeBaseReducer: ActionReducerMap<KnowledgeBaseModuleState> = {

	entities: knowledgeBaseEntitiesReducer,
	ui: knowledgeBaseUIReducer,
	tags: knowledgeBaseTagsReducer,
	sync: knowledgeBaseSyncReducer

}