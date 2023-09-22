import { UUID } from "lib/constants";
import { Entity } from "./entity.model";
import { ISODateString } from "./id-base.model";

export interface KBEntry extends Entity {

    parent: UUID | null;
    tags: string[],
    updated: ISODateString;
    urls: string[];

}

// export interface KBContent extends IDBase {

//     content: string;

// }