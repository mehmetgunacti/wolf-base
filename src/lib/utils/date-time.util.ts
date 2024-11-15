import { ISODateString } from '@models/id-base.model';

export function compareISODateStrings(d1: ISODateString, d2: ISODateString): number {

	const date1 = new Date(d1);
	const date2 = new Date(d2);
	return date1.getTime() - date2.getTime();

}

export function toDateObject(millisecondsSinceEpoch: string): Date | null {

	const ms = parseInt(millisecondsSinceEpoch, 10);
	if (isNaN(ms))
		return null;
	return new Date(ms); // Create a date object from milliseconds

}
