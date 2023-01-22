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

export type FIRESTORE_VALUE = { bytesValue: string } |
{ arrayValue: { values: FIRESTORE_VALUE[] } } |
{ booleanValue: boolean } |
{ doubleValue: number } |
{ geoPointValue: object } |
{ integerValue: number } |
{ mapValue: { fields: Record<string, FIRESTORE_VALUE> } } |
{ nullValue: null } |
{ referenceValue: string } |
{ stringValue: string } |
{ timestampValue: string };

