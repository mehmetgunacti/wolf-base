export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export function parseURL(url: string): URL | null {

	try {

		return new URL(url.toLowerCase());

	} catch (err) {

		console.warn('Failed to create URL from :', url);
		return null;

	}

}

export function isNull<T>(param: T | null): param is T {

	return param === null;

}

export function isUrl(url: URL | null): url is URL {
    return url !== null;
}

export function capitalize(val: string): string {

	if (val.length < 1)
		return val;
	return val.charAt(0).toUpperCase() + val.slice(1);

}
