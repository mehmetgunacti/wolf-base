import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Tag } from 'lib';
import { BookmarksModuleState } from 'modules/bookmark/bookmark.config';
import { selectorBookmarksArray } from './bookmarks.selector';

const selectorModuleState = createFeatureSelector<BookmarksModuleState>('bookmarksModule');
const selectorTagsState = createSelector(
	selectorModuleState,
	state => state.tags
)

export const selectorTagsArrayOfTagNameArray = createSelector(

	selectorBookmarksArray,
	(bookmarks): string[][] => bookmarks.map(b => b.tags)

);

// returns all tags of all bookmarks
export const selectorTagsDistinctTagsArray = createSelector(

	selectorTagsArrayOfTagNameArray,
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

export const selectorTagsSelected = createSelector(

	selectorTagsState,
	state => state.selectedTags

);

export const selectorTagsDisabled = createSelector(

	selectorTagsState,
	state => state.disabledTags

);
