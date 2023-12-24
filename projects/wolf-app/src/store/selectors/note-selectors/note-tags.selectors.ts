import { Note, QueryParams, Tag } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNote_array } from './note-entities.selectors';
import { selNote_UIState } from './note.selectors';

const arrayOfTagNames = createSelector(

	selNote_array,
	(notes): string[][] => notes.map(b => b.tags)

);

// returns all tags of all notes, distinct, for tag-cloud
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

export const selNoteQueryParams = createSelector(

	selNote_UIState,
	state => state.queryParams

);

export const selNotefilteredNotes = createSelector(

	selNote_array,
	selNoteQueryParams,
	(notes, params): Note[] => {

		if (!params.search && params.tags.length === 0)
			return [];

		// Filter notes based on selected tags
		const filteredNotes: Note[] = params.tags.reduce((acc, tag) => {
			return acc.filter(note => note.tags.includes(tag));
		}, notes);

		if (!params.search)
			return filteredNotes;

		// Split the search term into an array of individual words
		const searchWords = params.search.toLowerCase().split(' ');

		// Filter notes based on search term
		const result = filteredNotes.filter(note => {

			const { name } = note;
			const lowerCaseName = name.toLowerCase();

			// Check if any of the search words is present in the note's name or title
			return searchWords.every(word => lowerCaseName.includes(word));

		});

		return result;

	}

);

const arrOfFilteredTagNames = createSelector(

	selNotefilteredNotes,
	(notes): string[][] => notes.map(b => b.tags)

);

export const filteredNoteCount = createSelector(

	selNotefilteredNotes,
	(notes: Note[]) => notes.length

);

export const relatedTags = createSelector(

	arrOfFilteredTagNames,
	distinctTagNames,
	selNoteQueryParams,
	(arrTagsArray: string[][], distinctTagNames: string[], params: QueryParams): string[] => {

		if (params.tags.length === 0)
			return distinctTagNames;

		return [
			...new Set(
				arrTagsArray
					.filter(arrTags => params.tags.every(tag => arrTags.includes(tag)))
					.flat()
			)
		];

	}

);
