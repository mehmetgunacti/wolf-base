import { RemoteCollection } from "lib/constants";
import { Metadata } from "./entity.model";

export interface SyncData extends Metadata {

	updated: boolean;
	deleted: boolean;
	error: string | null;

}

export type SyncMessageType = 'normal' | 'title' | 'subtitle';
export type ISODateString = string;

export interface SyncLog {

	id: ISODateString;
	inProgress: boolean;
	result?: string;
	end?: ISODateString;

}

export interface SyncMessage {

	id?: number;
	syncLogId: ISODateString;
	collection: RemoteCollection;
	type: SyncMessageType;
	message: string;

}