export enum FIRESTORE_TYPE {

	arrayValue = 'arrayValue',
	bytesValue = 'bytesValue',
	booleanValue = 'booleanValue',
	doubleValue = 'doubleValue',
	geoPointValue = 'geoPointValue',
	integerValue = 'integerValue',
	mapValue = 'mapValue',
	nullValue = 'nullValue',
	referenceValue = 'referenceValue',
	stringValue = 'stringValue',
	timestampValue = 'timestampValue'

}

// export type FIRESTORE_TYPE =
// 	'arrayValue'
// 	| 'bytesValue'
// 	| 'booleanValue'
// 	| 'doubleValue'
// 	| 'geoPointValue'
// 	| 'integerValue'
// 	| 'mapValue'
// 	| 'nullValue'
// 	| 'referenceValue'
// 	| 'stringValue'
// 	| 'timestampValue';

export type FIRESTORE_VALUE_OBJECT<T> = Record<string, T>;

export type FIRESTORE_BYTE = { bytesValue: string };
export type FIRESTORE_ARRAY = { arrayValue: { values: FIRESTORE_VALUE[] } };
export type FIRESTORE_BOOLEAN = { booleanValue: boolean };
export type FIRESTORE_DOUBLE = { doubleValue: number };
export type FIRESTORE_GEOPOINT = { geoPointValue: object };
export type FIRESTORE_INTEGER = { integerValue: number };
export type FIRESTORE_MAP = { mapValue: { fields: Record<string, FIRESTORE_VALUE> } };
export type FIRESTORE_NULL = { nullValue: null };
export type FIRESTORE_REFERENCE = { referenceValue: string };
export type FIRESTORE_STRING = { stringValue: string };
export type FIRESTORE_TIMESTAMP = { timestampValue: string };

export type FIRESTORE_VALUE = FIRESTORE_BYTE |
	FIRESTORE_ARRAY |
	FIRESTORE_BOOLEAN |
	FIRESTORE_DOUBLE |
	FIRESTORE_GEOPOINT |
	FIRESTORE_INTEGER |
	FIRESTORE_MAP |
	FIRESTORE_NULL |
	FIRESTORE_REFERENCE |
	FIRESTORE_STRING |
	FIRESTORE_TIMESTAMP;




// export type FIRESTORE_VALUE = { bytesValue: string } |
// { arrayValue: { values: FIRESTORE_VALUE[] } } |
// { booleanValue: boolean } |
// { doubleValue: number } |
// { geoPointValue: object } |
// { integerValue: number } |
// { mapValue: { fields: Record<string, FIRESTORE_VALUE> } } |
// { nullValue: null } |
// { referenceValue: string } |
// { stringValue: string } |
// { timestampValue: string };

