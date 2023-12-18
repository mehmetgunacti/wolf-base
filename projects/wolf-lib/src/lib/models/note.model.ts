import { UUID } from 'lib/constants';
import { Entity } from './entity.model';
import { ISODateString } from './id-base.model';

export interface Note extends Entity {

	parentId: UUID | null;
	tags: string[];
	modified: ISODateString;

}

export interface NoteContent extends Entity {

	content: string;

}

export interface NoteNode extends Note {

	parent: NoteNode | null;
	children: NoteNode[];

}
