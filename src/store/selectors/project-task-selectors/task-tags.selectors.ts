import { Tag } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_array } from './task-entities.selectors';

const arrayOfTagNames = createSelector(

	selTask_array,
	(tasks): string[][] => tasks.map(t => t.tags)

);

// returns all tags of all tasks, distinct, for tag-cloud
export const distinctTagsArray = createSelector(

	arrayOfTagNames,
	(arrOfTagNames: string[][]): Tag[] =>

		// [['tag1', 'tag2'], ['tag2', 'tag3']] => ['tag1', 'tag2', 'tag2', 'tag3'].reduce(...) => Tag['tag1', 'tag2', 'tag3']
		Object.values(

			arrOfTagNames.flat().reduce(

				(acc: Record<string, Tag>, name: string) => {

					acc[name] = { name, count: (acc[name]?.count ?? 0) + 1 };
					return acc;

				},
				{} as Record<string, Tag>

			)

		)

);

export const selTask_distinctTagNames = createSelector(

	arrayOfTagNames,
	(tags: string[][]): string[] => [...new Set(tags.flat())]

);

// export const selTask_filteredTasks = createSelector(

// 	selTask_selected,
// 	selTask_array,
// 	selTask_QueryParams,
// 	(selectedBookmark, bookmarks, params): ClickedBookmark[] => {

// 		if (!params.id && !params.search && params.tags.length === 0)
// 			return [];

// 		if (selectedBookmark)
// 			return [selectedBookmark];

// 		// Filter bookmarks based on selected tags
// 		const filteredBookmarks: ClickedBookmark[] = params.tags.reduce((acc, tag) => {
// 			return acc.filter(bookmark => bookmark.tags.includes(tag));
// 		}, bookmarks);

// 		if (!params.search)
// 			return filteredBookmarks;

// 		// Split the search term into an array of individual words
// 		const searchWords = params.search.toLowerCase().split(' ');

// 		// Filter bookmarks based on search term
// 		const result = filteredBookmarks.filter(bookmark => {

// 			const { name, title, tags } = bookmark;
// 			const lowerCaseName = name.toLowerCase();
// 			const lowerCaseTitle = title.toLowerCase();

// 			// Check if any of the search words is present in the bookmark's name or title
// 			return searchWords.every(word => lowerCaseName.includes(word) || lowerCaseTitle.includes(word) || tags.some(tag => tag.includes(word)));

// 		});

// 		return result;

// 	}

// );

// const arrOfFilteredTagNames = createSelector(

// 	selBM_filteredBookmarks,
// 	(bookmarks): string[][] => bookmarks.map(b => b.tags)

// );

// export const filteredBookmarkCount = createSelector(

// 	selBM_filteredBookmarks,
// 	(bookmarks: Bookmark[]) => bookmarks.length

// );

// export const relatedTags = createSelector(

// 	arrOfFilteredTagNames,
// 	distinctTagNames,
// 	selBMQueryParams,
// 	(arrTagsArray: string[][], distinctTagNames: string[], params: BookmarkQueryParams): string[] => {

// 		if (params.tags.length === 0)
// 			return distinctTagNames;

// 		return [
// 			...new Set(
// 				arrTagsArray
// 					.filter(arrTags => params.tags.every(tag => arrTags.includes(tag)))
// 					.flat()
// 			)
// 		];

// 	}

// );
