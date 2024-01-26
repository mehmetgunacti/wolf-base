import { UUID } from "lib/constants";
import { IDBase } from "lib/models";

export function elseEmptyArray<T>(v: T[] | null | undefined): T[] {

	return v ?? [];

}

export function createArray(n: number): number[] {

	return Array.from({ length: n }, (_, i) => i + 1);

}

export function filterArrayElements(array: string[], elementsToFilterOut: string[]) {

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
