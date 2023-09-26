import { UUID } from "lib/constants";
import { Entity } from "./entity.model";
import { IDBase, ISODateString } from "./id-base.model";

export interface KBEntry extends Entity {

	parentId: UUID | null;
	urls: string[];
	popular: boolean;

}

export interface KBEntryNode extends KBEntry {

	parent: KBEntryNode | null;
	children: KBEntryNode[];

}

export interface KBContent extends IDBase {

	content: string;
	updated: ISODateString;

}