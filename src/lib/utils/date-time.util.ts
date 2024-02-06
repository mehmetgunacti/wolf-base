import { ISODateString } from 'lib/models';

export function compareISODateStrings(d1: ISODateString, d2: ISODateString): number {

	const date1 = new Date(d1);
	const date2 = new Date(d2);
	return date1.getTime() - date2.getTime();

}
