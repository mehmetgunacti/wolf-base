import { UUID } from "lib/constants";
import { Entity } from "./entity.model";
import { Tag } from "./tag.model";
import { IDBase, ISODateString } from "./id-base.model";

export interface KBEntry extends Entity {

    parent: UUID | null;
    tags: Tag[],
    updated: ISODateString;
    source: string[];

}

export interface KBContent extends IDBase {

    content: string;

}