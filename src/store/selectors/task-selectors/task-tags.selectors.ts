import { Tag, TaskQueryParams } from '@lib';
import { createSelector } from '@ngrx/store';
import { selTask_EntityList } from '../entity-selectors/entity-task.selectors';
import { selTask_filteredTasks, selTask_queryParams } from './task-ui.selectors';

const arrayOfTagNames = createSelector(

	selTask_EntityList,
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
