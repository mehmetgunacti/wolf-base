import { UUID } from '@constants/common.constant';
import { BookmarkQueryParams, Click } from '@models/bookmark.model';

export interface Bookmark_ModuleState {

	clicks: BookmarkClicksState;
	ui: BookmarkUIState;

}

// todo move some properties to ui state
export interface BookmarkClicksState {

	values: Record<UUID, Click>;

}

export interface BookmarkUIState {

	queryParams: BookmarkQueryParams;
	formVisible: boolean;
	editId: UUID | null;
	shaking: boolean;

}

// INITIALIZATION

export const bookmark_initialClicksState: BookmarkClicksState = {

	values: {}

};

export const bookmark_initialUIState: BookmarkUIState = {

	queryParams: {
		id: null,
		search: null,
		tags: []
	},
	formVisible: false,
	editId: null,
	shaking: false

};

export const bookmark_initialState: Bookmark_ModuleState = {

	clicks: bookmark_initialClicksState,
	ui: bookmark_initialUIState

};
