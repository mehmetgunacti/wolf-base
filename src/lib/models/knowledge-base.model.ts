import { UUID } from "lib/constants";
import { Entity } from "./entity.model";
import { ISODateString } from "./id-base.model";

export interface KBEntry extends Entity {

    parentId: UUID | null;
    tags: string[],
    updated: ISODateString;
    urls: string[];

    parent: KBEntry | null;
    entries: KBEntry[];

}

// export interface KBContent extends IDBase {

//     content: string;

// }