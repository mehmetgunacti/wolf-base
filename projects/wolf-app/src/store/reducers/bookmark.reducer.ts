import { ActionReducerMap } from "@ngrx/store";
import { BookmarkModuleState } from "store/states/bookmark.state";
import { bookmarkEntitiesReducer } from "./bookmark-entities.reducer";
import { bookmarkTagsReducer } from "./bookmark-tags.reducer";
import { bookmarkUIReducer } from "./bookmark-ui.reducer";

export const bookmarkReducer: ActionReducerMap<BookmarkModuleState> = {

	entities: bookmarkEntitiesReducer,
	ui: bookmarkUIReducer,
	tags: bookmarkTagsReducer

}
