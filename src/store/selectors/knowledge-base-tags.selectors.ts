import { createSelector } from '@ngrx/store';
import { KBEntry, Tag } from 'lib';
import { selKBEntriesArray } from './knowledge-base-entities.selectors';
import { selKnowledgeBaseTagsState } from './knowledge-base.selectors';

const arrayOfTagNames = createSelector(

	selKBEntriesArray,
	(entries): string[][] => entries.map(e => e.tags)

);

// returns all tags of all entries, distinct, for tag-cloud
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

	selKnowledgeBaseTagsState,
	state => state.selectedTags

);

export const searchTerm = createSelector(

	selKnowledgeBaseTagsState,
	state => state.searchTerm

);

// move to entities.selector.ts
export const filteredKBEntries = createSelector(

	selKBEntriesArray,
	selectedTags,
	searchTerm,
	(entries, tags, term): KBEntry[] => {

		// Filter entries based on selected tags
		const filteredEntries: KBEntry[] = tags.reduce((acc, tag) => {
			return acc.filter(entry => entry.tags.includes(tag));
		}, entries);

		if (!term)
			return filteredEntries;

		// Split the search term into an array of individual words
		const searchWords = term.toLowerCase().split(' ');

		// Filter entries based on search term
		const result = filteredEntries.filter(entry => {

			const { name } = entry;
			const lowerCaseName = name.toLowerCase();

			// Check if any of the search words is present in the entity's name
			return searchWords.every(word => lowerCaseName.includes(word));

		});

		return result;

	}

);

const arrOfFilteredTagNames = createSelector(

	filteredKBEntries,
	(entries): string[][] => entries.map(e => e.tags)

);

export const filteredKnowledgeBaseCount = createSelector(

	filteredKBEntries,
	(entries: KBEntry[]) => entries.length

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