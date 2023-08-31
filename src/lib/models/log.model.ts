import { ISODateString } from "./id-base.model";

export interface LogMessage {

    id?: number;
    date: ISODateString;
    message: string;

}