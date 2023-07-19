import { ActionReducerMap } from "@ngrx/store";
import { BookmarkModuleState } from "store/states/bookmark.state";
import { entitiesReducer } from "./entities.reducer";
import { syncReducer } from "./sync.reducer";
import { tagsReducer } from "./tags.reducer";
import { uiReducer } from "./ui.reducer";

export const bookmarkReducer: ActionReducerMap<BookmarkModuleState> = {

    entities: entitiesReducer,
    ui: uiReducer,
    tags: tagsReducer,
    sync: syncReducer

}