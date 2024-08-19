import { Tag, Task, TaskQueryParams } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_array } from './task-entities.selectors';
import { selTask_queryParams } from './task-ui.selectors';

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

export const selTask_filteredTasks = createSelector(

	selTask_array,
	selTask_queryParams,
	(tasks, params): Task[] => {

		let entities = tasks;

		// filter by status
		if (params.status !== 'all')
			entities = entities.filter(e => e.status === params.status);

		// filter by category
		if (params.category !== 'all')
			entities = entities.filter(e => e.category === params.category);

		// filter by tags
		const filteredEntities: Task[] =
			params.tags.reduce(

				(acc, tag) => { return acc.filter(e => e.tags.includes(tag)); },
				entities

			);

		if (!params.search)
			return filteredEntities;

		// Split the search term into an array of individual words
		const searchWords = params.search.toLowerCase().split(' ');

		// Filter entities based on search term
		const result = filteredEntities.filter(task => {

			const { name, description, tags } = task;
			const lowerCaseName = name.toLowerCase();
			const lowerCaseDescription = description?.toLowerCase() ?? '';

			// Check if any of the search words is present in entity properties
			return searchWords.every(
				word => lowerCaseName.includes(word) || lowerCaseDescription.includes(word) || tags.some(tag => tag.includes(word))
			);

		});

		return result;

	}

);

const arrOfFilteredTagNames = createSelector(

	selTask_filteredTasks,
	(entities): string[][] => entities.map(b => b.tags)

);

export const relatedTags = createSelector(

	arrOfFilteredTagNames,
	selTask_distinctTagNames,
	selTask_queryParams,
	(arrTagsArray: string[][], distinctTagNames: string[], params: TaskQueryParams): string[] => {

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
