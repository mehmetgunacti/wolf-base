export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, 10)); // ms));

export const isNewer = (date1: string, date2: string): boolean => {

	const d1 = new Date(date1).getTime();
	const d2 = new Date(date2).getTime();

	console.log('dates: ', d1, d2);
	return d1 > d2;

}

export const isEnumValue = <T>(value: string, enumType: any): T[keyof T] => {

	if (Object.values(enumType).includes(value))
		return enumType[value];

	throw new Error(`${value} not a member of ${enumType}`);

}

export const removeOverlappingProperties = <T>(obj: Partial<T>, properties: Partial<T>) => {

	const newObj = { ...obj };
	for (const key in properties)
		delete newObj[key];
	return newObj;

};

export const pad10 = (value: number): string => {

	return value < 10 ? '0' + value : '' + value;

};

export const date2string = (d: Date): string => {

	// yyyy-MM-ddThh:mm
	const year = d.getFullYear();
	const month = pad10(d.getMonth() + 1);
	const day = pad10(d.getDate());
	const hours = pad10(d.getHours());
	const minutes = pad10(d.getMinutes());
	const seconds = pad10(d.getSeconds());

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

};

export const string2date = (d: Date): string => {

	// yyyy-MM-ddThh:mm
	const year = d.getFullYear();
	const month = pad10(d.getMonth() + 1);
	const day = pad10(d.getDate());
	const hours = pad10(d.getHours());
	const minutes = pad10(d.getMinutes());
	const seconds = pad10(d.getSeconds());

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

};
