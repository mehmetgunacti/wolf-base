import { Note, Tag } from '@lib';
import { createSelector } from '@ngrx/store';
import { selNoteArray } from './note-entities.selectors';
import { selNoteTagsState } from './note.selectors';

const arrayOfTagNames = createSelector(

	selNoteArray,
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

export const selectedTags = createSelector(

	selNoteTagsState,
	state => state.selectedTags

);

export const searchTerm = createSelector(

	selNoteTagsState,
	state => state.searchTerm

);

// move to entities.selector.ts
export const filteredNotes = createSelector(

	selNoteArray,
	selectedTags,
	searchTerm,
	(notes, tags, term): Note[] => {

		// Filter notes based on selected tags
		const filteredNotes: Note[] = tags.reduce((acc, tag) => {
			return acc.filter(note => note.tags.includes(tag));
		}, notes);

		if (!term)
			return filteredNotes;

		// Split the search term into an array of individual words
		const searchWords = term.toLowerCase().split(' ');

		// Filter notes based on search term
		const result = filteredNotes.filter(note => {

			const { name, content } = note;
			const lowerCaseName = name.toLowerCase();
			const lowerCaseTitle = content.toLowerCase();

			// Check if any of the search words is present in the note's name or title
			return searchWords.every(word => lowerCaseName.includes(word) || lowerCaseTitle.includes(word));

		});

		return result;

	}

);

const arrOfFilteredTagNames = createSelector(

	filteredNotes,
	(notes): string[][] => notes.map(b => b.tags)

);

export const filteredNoteCount = createSelector(

	filteredNotes,
	(notes: Note[]) => notes.length

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
