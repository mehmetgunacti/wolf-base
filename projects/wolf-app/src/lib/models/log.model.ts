import { LogCategory, UUID } from "lib/constants";
import { ISODateString } from "./id-base.model";

export interface LogMessage {

    id?: number;
    date: ISODateString;
    category: LogCategory;
    message: string;
    entityId?: UUID;

}