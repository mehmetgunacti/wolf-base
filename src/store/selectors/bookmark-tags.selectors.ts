import { createSelector } from '@ngrx/store';
import { Bookmark, Tag } from 'lib';
import { sltBookmarksArray } from './bookmark-entities.selectors';
import { sltBookmarkTagsState } from './bookmark.selectors';

const arrayOfTagNames = createSelector(

	sltBookmarksArray,
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

	sltBookmarkTagsState,
	state => state.selectedTags

);

export const searchTerm = createSelector(

	sltBookmarkTagsState,
	state => state.searchTerm

);

// move to entities.selector.ts
export const filteredBookmarks = createSelector(

	sltBookmarksArray,
	selectedTags,
	searchTerm,
	(bookmarks, tags, term): Bookmark[] => {

		// Filter bookmarks based on selected tags
		const filteredBookmarks: Bookmark[] = tags.reduce((acc, tag) => {
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

const arrOfFilteredTagNames = createSelector(

	filteredBookmarks,
	(bookmarks): string[][] => bookmarks.map(b => b.tags)

);

export const filteredBookmarkCount = createSelector(

	filteredBookmarks,
	(bookmarks: Bookmark[]) => bookmarks.length

);

export const relatedTags = createSelector(

	arrOfFilteredTagNames,
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