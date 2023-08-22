import { Bookmark, Click, RemoteMetadata, SyncData, UUID } from "lib";

export interface BookmarkModuleState {

	entities: BookmarkEntitiesState;
	ui: BookmarkUIState;
	tags: BookmarkTagsState;
	sync: BookmarkSyncState;

}

// todo move some properties to ui state
export interface BookmarkEntitiesState {

	entities: Record<UUID, Bookmark>;
	selected: UUID | null;
	clicks: Record<UUID, Click>;

}

export interface BookmarkSyncState {

	syncData: SyncData[];
	remoteMetadata: RemoteMetadata[];
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
	remoteMetadata: [],
	trashCount: 0

};

export const initialBookmarkEntitiesState: BookmarkEntitiesState = {

	entities: {},
	selected: null,
	clicks: {}

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