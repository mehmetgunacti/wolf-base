import { UUID } from "lib/constants";
import { Entity } from "./entity.model";
import { ISODateString } from "./id-base.model";
import { Tag } from "./tag.model";

export interface KBEntry extends Entity {

    parent: UUID | null;
    tags: Tag[],
    updated: ISODateString;
    source: string[];

}

// export interface KBContent extends IDBase {

//     content: string;

// }