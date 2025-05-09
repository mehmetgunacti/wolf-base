import { AppEntityType } from '@constants/entity.constant';

export function isEntityOfType(type: AppEntityType) {

	return function <T extends { entityType: AppEntityType; }>(params: T) {

		return params.entityType === type;

	};

}

export function elseEmptyObject<T>(v: T | null | undefined): T {

	return v ?? {} as T;

}

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

export function formatBytes(bytes: number) {

	if (bytes === 0)
		return '0 Bytes';

	const k = 1024;
	const sizes = [ 'B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB' ];
	const i = Math.floor(Math.log(bytes) / Math.log(k));

	const f = (bytes / Math.pow(k, i)).toFixed(2);
	return f.replace('.', ',') + ' ' + sizes[ i ];

}
