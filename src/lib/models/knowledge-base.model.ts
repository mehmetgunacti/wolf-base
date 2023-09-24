import { UUID } from "lib/constants";
import { Entity } from "./entity.model";
import { IDBase, ISODateString } from "./id-base.model";

export interface KBEntry extends Entity {

	parentId: UUID | null;
	tags: string[],
	updated: ISODateString;
	urls: string[];

}

export interface KBEntryNode extends KBEntry {

	parent: KBEntryNode | null;
	children: KBEntryNode[];

}

export interface KBContent extends IDBase {

	content: string;

}