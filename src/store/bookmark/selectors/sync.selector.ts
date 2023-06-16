import { createSelector } from "@ngrx/store";
import { bookmarksArray } from "./entities.selector";

export const bookmarksCreated = createSelector(

	bookmarksArray,
	bookmarks => -1 // bookmarks.filter(b => !b.sync).length

);

export const bookmarksClicked = createSelector(

	bookmarksArray,
	bookmarks => -1 // bookmarks.filter(b => (b.sync?.clicks ?? 0) > 0).length

);

export const bookmarksDeleted = createSelector(

	bookmarksArray,
	bookmarks => -1 // bookmarks.filter(b => !b.sync).length

);

export const bookmarksUpdated = createSelector(

	bookmarksArray,
	bookmarks => -1 // bookmarks.filter(b => b.sync?.data).length

);