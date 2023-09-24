import { KBEntry, KBEntryNode, RemoteMetadata, SyncData, UUID } from "lib";

export interface KnowledgeBaseModuleState {

	entities: KnowledgeBaseEntitiesState;
	ui: KnowledgeBaseUIState;
	tags: KnowledgeBaseTagsState;
	sync: KnowledgeBaseSyncState;

}

// todo move some properties to ui state
export interface KnowledgeBaseEntitiesState {

	entities: Record<UUID, KBEntryNode>;
	selected: UUID | null;
	content: string | null;

}

export interface KnowledgeBaseSyncState {

	syncData: SyncData[];
	remoteMetadata: RemoteMetadata[];
	trashCount: number;

}

export interface KnowledgeBaseTagsState {

	selectedTags: string[];
	searchTerm: string | null;

}

export interface KnowledgeBaseUIState {

	// tagCloudVisible: boolean;
	// editDialogVisible: boolean;

}

// INITIALIZATION

export const initialKnowledgeBaseSyncState: KnowledgeBaseSyncState = {

	syncData: [],
	remoteMetadata: [],
	trashCount: 0

};

export const initialKnowledgeBaseEntitiesState: KnowledgeBaseEntitiesState = {

	entities: {},
	selected: null,
	content: null

};

export const initialKnowledgeBaseTagsState: KnowledgeBaseTagsState = {

	selectedTags: [],
	searchTerm: null

};

export const initialKnowledgeBaseUIState: KnowledgeBaseUIState = {

	// tagCloudVisible: false,
	// editDialogVisible: false

};

export const initialKnowledgeBaseState: KnowledgeBaseModuleState = {

	entities: initialKnowledgeBaseEntitiesState,
	ui: initialKnowledgeBaseUIState,
	tags: initialKnowledgeBaseTagsState,
	sync: initialKnowledgeBaseSyncState

};