import { Bookmark, Click, SyncData, UUID } from "lib";

export interface BookmarkModuleState {

	entities: BookmarkEntitiesState;
	ui: BookmarkUIState;
	tags: BookmarkTagsState;
	sync: BookmarkSyncState;

}

// todo move some properties to ui state
export interface BookmarkEntitiesState {

	entities: Map<UUID, Bookmark>;
	selected: UUID | null;
	clicks: Click[];

}

export interface BookmarkSyncState {

	syncData: SyncData[];
	trashCount: number;

}

export interface BookmarkTagsState {

	selectedTags: string[];
	searchTerm: string | null;

}

export interface BookmarkUIState {

	tagCloudVisible: boolean;
	editDialogVisible: boolean;

}

// INITIALIZATION

export const initialBookmarkSyncState: BookmarkSyncState = {

	syncData: [],
	trashCount: 0

};

export const initialBookmarkEntitiesState: BookmarkEntitiesState = {

	entities: new Map(),
	selected: null,
	clicks: []

};

export const initialBookmarkTagsState: BookmarkTagsState = {

	selectedTags: [],
	searchTerm: null

};

export const initialBookmarkUIState: BookmarkUIState = {

	tagCloudVisible: false,
	editDialogVisible: false

};

export const initialBookmarkState: BookmarkModuleState = {

	entities: initialBookmarkEntitiesState,
	ui: initialBookmarkUIState,
	tags: initialBookmarkTagsState,
	sync: initialBookmarkSyncState

};