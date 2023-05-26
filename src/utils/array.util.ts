export const toggleArrayItem = <T>(arr: T[] = [], item: T): T[] => {

	if (arr.includes(item))
		return arr.filter((element) => element !== item);

	return [...arr, item];

}

export const commaSplit = (input?: string): string[] => {

	if (!input)
		return [];

	return input.split(",");

};