import { UUID } from '@constants/common.constant';
import { BookmarkQueryParams, Click } from '@models/bookmark.model';

export interface Bookmark_ModuleState {

	clicks: Bookmark_ClicksState;
	ui: Bookmark_UIState;

}

// todo move some properties to ui state
export interface Bookmark_ClicksState {

	values: Record<UUID, Click>;

}

export interface Bookmark_UIState {

	queryParams: BookmarkQueryParams;
	formVisible: boolean;
	editId: UUID | null;
	shaking: boolean;

}

// INITIALIZATION

export const bookmark_initialClicksState: Bookmark_ClicksState = {

	values: {}

};

export const bookmark_initialUIState: Bookmark_UIState = {

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
