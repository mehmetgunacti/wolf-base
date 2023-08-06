import { createSelector } from "@ngrx/store";
import { bookmarkCreatedCount, bookmarkDeletedCount, bookmarkErrorsCount, bookmarkUpdatedCount } from "./bookmark-sync.selectors";

export const syncableItemsCount = createSelector(

    bookmarkErrorsCount,
    bookmarkCreatedCount,
    bookmarkDeletedCount,
    bookmarkUpdatedCount,
    (a, b, c, d) => a + b + c + d

);

const syncableErrorsCount = createSelector(

    bookmarkErrorsCount,
    count => count

);

export const menuSyncBadge = createSelector(

	syncableItemsCount,
	syncableErrorsCount,
	(total, errors) => errors > 0 ? `${errors}/${total}` : `${total}`

);