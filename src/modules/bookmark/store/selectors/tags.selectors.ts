import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Tag } from 'lib';
import { BookmarksModuleState } from 'modules/bookmark/bookmark.config';
import { selectorBookmarksArray } from './bookmarks.selectors';

const selectorModuleState = createFeatureSelector<BookmarksModuleState>('bookmarksModule');
const selectorTagsState = createSelector(
	selectorModuleState,
	state => state.tags
)

export const tagsSelectorArrayOfTagNameArray = createSelector(

	selectorBookmarksArray,
	(bookmarks): string[][] => bookmarks.map(b => b.tags)

);

// returns all tags of all bookmarks, distinct, for tag-cloud
export const tagsSelectorDistinctTagsArray = createSelector(

	tagsSelectorArrayOfTagNameArray,
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

const tagsSelectorAllDistinctTagNames = createSelector(

	tagsSelectorArrayOfTagNameArray,
	(arrTagsArray: string[][]) => [...new Set(arrTagsArray.flat())]

);

export const tagsSelectorSelectedTags = createSelector(

	selectorTagsState,
	state => state.selectedTags

);

const tagsSelectorSelectableTags = createSelector(

	tagsSelectorArrayOfTagNameArray,
	tagsSelectorSelectedTags,
	(arrTagsArray: string[][], selectedTags: string[]): string[] => [
		...new Set(
			arrTagsArray
				.filter(arrTags => selectedTags.every(tag => arrTags.includes(tag)))
				.flat()
		)
	]

);

export const tagsSelectorDisabledTags = createSelector(

	tagsSelectorAllDistinctTagNames,
	tagsSelectorSelectableTags,
	(allTagsNames: string[], selectables: string[]): string[] => allTagsNames.filter(name => !selectables.includes(name))

);
