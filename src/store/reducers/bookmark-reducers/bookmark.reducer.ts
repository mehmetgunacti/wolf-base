import { ActionReducerMap } from "@ngrx/store";
import { BookmarkModuleState } from "store/states/bookmark.state";
import { bookmarkEntitiesReducer } from "./bookmark-entities.reducer";
import { bookmarkUIReducer } from "./bookmark-ui.reducer";

export const bookmarkReducer: ActionReducerMap<BookmarkModuleState> = {

	entities: bookmarkEntitiesReducer,
	ui: bookmarkUIReducer

}
