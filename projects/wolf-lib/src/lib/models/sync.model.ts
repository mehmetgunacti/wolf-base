import { Metadata } from './entity.model';

export interface SyncData extends Metadata {

	updated: boolean;
	deleted: boolean;
	error: string | null;

}
