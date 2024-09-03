import { ActionReducerMap } from "@ngrx/store";
import { BookmarkModuleState } from "store/states/bookmark.state";
import { bookmarkClicksReducer } from './bookmark-clicks.reducer';
import { bookmarkUIReducer } from "./bookmark-ui.reducer";

export const bookmarkReducer: ActionReducerMap<BookmarkModuleState> = {

	clicks: bookmarkClicksReducer,
	ui: bookmarkUIReducer

}
