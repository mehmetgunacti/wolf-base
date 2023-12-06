import { Bookmark, Click, OVERLAY_ID, RemoteMetadata, SyncData, UUID } from "@lib";

export interface BookmarkModuleState {

	entities: BookmarkEntitiesState;
	ui: BookmarkUIState;
	tags: BookmarkTagsState;

}

// todo move some properties to ui state
export interface BookmarkEntitiesState {

	entities: Record<UUID, Bookmark>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;
	clicks: Record<UUID, Click>;

	selected: UUID | null;

}

export interface BookmarkTagsState {

	selectedTags: string[];
	searchTerm: string | null;

}

export interface BookmarkUIState {

	editDialogOverlayId: OVERLAY_ID | null;
	shaking: boolean;

}

// INITIALIZATION

export const initialBookmarkEntitiesState: BookmarkEntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {},
	selected: null,
	clicks: {}

};

export const initialBookmarkTagsState: BookmarkTagsState = {

	selectedTags: [],
	searchTerm: null

};

export const initialBookmarkUIState: BookmarkUIState = {

	editDialogOverlayId: null,
	shaking: false

};

export const initialBookmarkState: BookmarkModuleState = {

	entities: initialBookmarkEntitiesState,
	ui: initialBookmarkUIState,
	tags: initialBookmarkTagsState

};
