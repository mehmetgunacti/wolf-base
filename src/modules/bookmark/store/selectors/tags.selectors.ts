import { createSelector } from '@ngrx/store';
import { Tag } from 'lib';
import { bookmarksArray } from './bookmarks.selectors';
import { selectorModuleState } from './selectors';

const selectorTagsState = createSelector(
	selectorModuleState,
	state => state.tags
)

const arrayOfTagNames = createSelector(

	bookmarksArray,
	(bookmarks): string[][] => bookmarks.map(b => b.tags)

);

// returns all tags of all bookmarks, distinct, for tag-cloud
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

const distinctTagNames = createSelector(

	arrayOfTagNames,
	(tags: string[][]): string[] => [...new Set(tags.flat())]

);

export const selectedTags = createSelector(

	selectorTagsState,
	state => state.selectedTags

);

export const relatedTags = createSelector(

	arrayOfTagNames,
	distinctTagNames,
	selectedTags,
	(arrTagsArray: string[][], distinctTagNames: string[], selectedTags: string[]): string[] => {

		if (selectedTags.length === 0)
			return distinctTagNames;

		return [
			...new Set(
				arrTagsArray
					.filter(arrTags => selectedTags.every(tag => arrTags.includes(tag)))
					.flat()
			)
		];

	}

);

export const searchTerm = createSelector(

	selectorTagsState,
	state => state.searchTerm

);

export const filteredBookmarks = createSelector(
	bookmarksArray,
	selectedTags,
	searchTerm,
	(bookmarks, tags, term) => {

		// Filter bookmarks based on tags
		const filteredBookmarks = tags.reduce((acc, tag) => {
			return acc.filter(bookmark => bookmark.tags.includes(tag));
		}, bookmarks);

		if (!term)
			return filteredBookmarks;

		// Split the search term into an array of individual words
		const searchWords = term.toLowerCase().split(' ');

		// Filter bookmarks based on search term
		const result = filteredBookmarks.filter(bookmark => {
			const { name, title } = bookmark;
			const lowerCaseName = name.toLowerCase();
			const lowerCaseTitle = title.toLowerCase();

			// Check if any of the search words is present in the bookmark's name or title
			return searchWords.every(word => lowerCaseName.includes(word) || lowerCaseTitle.includes(word));
		});

		return result;

	}

);