import { Entity, HasParentId } from './entity.model';
import { ISODateString } from './id-base.model';

export interface Note extends HasParentId {

	tags: string[];
	modified: ISODateString;

}

export interface NoteContent extends Entity {

	content: string;

}

export interface NoteQueryParams {

	search: string | null,
	tags: string[]

}
