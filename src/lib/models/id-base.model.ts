import { UUID } from '@constants';

// ISO 8601:
// 2025-10-05T14:48:00.000Z
// YYYY-MM-DDTHH:mm:ss.sssZ
export type ISODateString = string;

export interface IDBase {

	id: UUID;

}

export interface NameBase extends IDBase {

	name: string;

}

export function emptyNameBase(): NameBase {

	return { id: 'EMPTY_ID', name: 'EMPTY_NAME_BASE' };

}
