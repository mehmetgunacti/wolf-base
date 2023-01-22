export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, 10)); // ms));

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
