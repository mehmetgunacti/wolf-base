import { createSelector } from "@ngrx/store";

// export const syncableItemsCount = createSelector(

//     bookmarkErrorsCount,
//     bookmarkCreatedCount,
//     bookmarkDeletedCount,
//     bookmarkUpdatedCount,
//     (a, b, c, d) => a + b + c + d

// );

// const syncableErrorsCount = createSelector(

//     bookmarkErrorsCount,
//     count => count

// );

export const menuSyncBadge = createSelector(

	() => ([4, 1])

);