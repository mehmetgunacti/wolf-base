import { Bookmark, Click, OVERLAY_ID, BookmarkQueryParams, RemoteMetadata, SyncData, UUID } from "@lib";

export interface BookmarkModuleState {

	entities: BookmarkEntitiesState;
	ui: BookmarkUIState;

}

// todo move some properties to ui state
export interface BookmarkEntitiesState {

	entities: Record<UUID, Bookmark>;
	syncData: Record<UUID, SyncData>;
	remoteMetadata: Record<UUID, RemoteMetadata>;
	clicks: Record<UUID, Click>;

}

export interface BookmarkUIState {

	queryParams: BookmarkQueryParams;

	editId: UUID | null;
	editDialogOverlayId: OVERLAY_ID | null;

	shaking: boolean;

}

// INITIALIZATION

export const initialBookmarkEntitiesState: BookmarkEntitiesState = {

	entities: {},
	syncData: {},
	remoteMetadata: {},
	clicks: {}

};

export const initialBookmarkUIState: BookmarkUIState = {

	queryParams: {
		id: null,
		search: null,
		tags: []
	},

	editId: null,
	editDialogOverlayId: null,
	shaking: false

};

export const initialBookmarkState: BookmarkModuleState = {

	entities: initialBookmarkEntitiesState,
	ui: initialBookmarkUIState

};
