import { ActionReducerMap } from "@ngrx/store";
import { BookmarkModuleState } from "../states";
import { entitiesReducer } from "./entities.reducer";
import { uiReducer } from "./ui.reducer";
import { tagsReducer } from "./tags.reducer";
import { syncReducer } from "./sync.reducer";

export const bookmarkReducer: ActionReducerMap<BookmarkModuleState> = {

    entities: entitiesReducer,
    ui: uiReducer,
    tags: tagsReducer,
    sync: syncReducer

}