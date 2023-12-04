import { UUID } from "lib/constants/common.constant";

export type ISODateString = string;

export interface IDBase {

	id: UUID;

}

export interface NameBase extends IDBase {

	name: string;

}
