import { UUID } from "lib/constants";
import { IDBase } from "lib/models";

export function insertAtRandomPosition<T>(arr: T[], element: T) {

	const randomIndex = Math.floor(Math.random() * (arr.length + 1));
	arr.splice(randomIndex, 0, element);
	return arr;

}

export function replaceByPrefix(oldValues: string[], prefix: string, newValue: string): string[] {

	const list: string[] = [newValue];
	oldValues.forEach(v => {

		if (!v.startsWith(prefix))
			list.push(v);

	});
	return list;

}

export function elseEmptyArray<T>(v: T[] | null | undefined): T[] {

	return v ?? [];

}

export function createArray(n: number): number[] {

	return Array.from({ length: n }, (_, i) => i + 1);

}

/**
 * Filters out specified elements from an array.
 *
 * @param {string[]} array - The array to filter.
 * @param {string[]} elementsToFilterOut - The elements to remove from the array.
 * @returns {string[]} A new array with the specified elements filtered out.
 *
 * @example
 * // Returns ['apple', 'banana']
 * filterArrayElements(['apple', 'banana', 'cherry'], ['cherry']);
 */
export function filterArrayElements(array: string[], elementsToFilterOut: string[]): string[] {

	return array.filter(element => !elementsToFilterOut.includes(element));

}

export const toggleArrayItem = <T>(arr: T[] = [], item: T): T[] => {

	if (arr.includes(item))
		return arr.filter((element) => element !== item);

	return [...arr, item];

}

export const commaSplit = (input: string | null): string[] => {

	if (!input)
		return [];

	return input.split(",");

};

export function toDictionary<T extends IDBase>(items: T[]): Record<UUID, T> {

	const result = items.reduce(
		(dictionary, item) => {

			dictionary[item.id] = item;
			return dictionary;

		},
		{} as Record<UUID, T>
	);
	console.log(result);
	return result;


}
