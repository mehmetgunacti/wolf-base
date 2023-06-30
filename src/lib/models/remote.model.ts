import { Metadata } from "./entity.model";

export interface RemoteMetadata extends Metadata { }

export interface RemoteData<T> {

	metaData: RemoteMetadata;
	entity: T;

}