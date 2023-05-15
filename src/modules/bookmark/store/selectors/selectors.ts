import { createFeatureSelector } from "@ngrx/store";
import { BookmarksModuleState } from "modules/bookmark/bookmark.config";

export const selectorModuleState = createFeatureSelector<BookmarksModuleState>('bookmarksModule');