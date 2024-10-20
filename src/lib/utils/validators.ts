import { UUID } from '@constants';
import { IdBase } from '@models';
import { v4 as uuidv4 } from 'uuid';

export function assertIDBase(value: unknown): asserts value is IdBase {

	if (typeof value !== 'object' || value === null || !('id' in value))
		throw new Error("Value does not have an 'id' property");

}

export function assertUUIDv4(id: string): asserts id is UUID {

	// valid: "007952af-7064-4168-96ae-ccd3724c8ac4"
	const uuidv4Regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
	if (!uuidv4Regex.test(id))
		throw new Error(`'${id}' is not a valid UUID v4`);

}

export function provideId(value: unknown, createId: boolean): UUID {

	assertIDBase(value);

	if (createId && value.id)
		console.warn(`Overriding incoming 'id' with new uuid. Incoming 'id': ${value.id}`);

	if (createId)
		return uuidv4() as UUID;

	assertUUIDv4(value.id);
	return value.id as UUID;

}

class InvalidTypeException extends Error {

	constructor(expectedType: string, actualType: string) {

		super(`Expected type ${expectedType} but received ${actualType}`);
		this.name = "InvalidTypeException";

	}

}

export function isArray(value: unknown): value is unknown[] {

	return Array.isArray(value);

}

export function assertArray(value: unknown): asserts value is unknown[] {

	if (isArray(value))
		return;
	throw new InvalidTypeException('array', typeof value);

}

export function checkArray(value: unknown): unknown[] {

	assertArray(value);
	return value;

}

export function isNonEmptyArray(value: unknown): value is unknown[] {

	return isArray(value) && value.length > 0;

}

export function assertNonEmptyArray<T>(value: unknown): asserts value is T[] {

	if (isNonEmptyArray(value))
		return;
	throw new InvalidTypeException('non empty array', typeof value);

}

export function checkNonEmptyArray<T>(value: unknown): T[] {

	assertNonEmptyArray<T>(value);
	return value;

}

export function isBoolean(value: unknown): value is boolean {

	return typeof value === 'boolean';

}

export function assertBoolean(value: unknown): asserts value is boolean {

	if (isBoolean(value))
		return;
	throw new InvalidTypeException('boolean', typeof value);

}

export function checkBoolean(value: unknown): boolean {

	assertBoolean(value);
	return value;

}

export function isNumber(value: unknown): value is boolean {

	return typeof value === 'number';

}

export function assertNumber(value: unknown): asserts value is number {

	if (isNumber(value))
		return;
	throw new InvalidTypeException('number', typeof value);

}

export function checkNumber(value: unknown): number {

	assertNumber(value);
	return value;

}

export function isString(value: unknown): value is string {

	return typeof value === 'string';

}

export function assertString(value: unknown): asserts value is string {

	if (isString(value))
		return;
	throw new InvalidTypeException('string', typeof value);

}

export function checkString(value: unknown): string {

	assertString(value);
	return value;

}

export function isStringOrNull(value: unknown): value is boolean {

	return value === null || isString(value);

}

export function assertStringOrNull(value: unknown): asserts value is string | null {

	if (value === null || isString(value))
		return;
	throw new InvalidTypeException('nullable string', typeof value);

}

export function checkStringOrNull(value: unknown): string | null {

	assertStringOrNull(value);
	return value;

}
