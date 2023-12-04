import { Entity, Metadata } from "./entity.model";

export interface RemoteMetadata extends Metadata { }

export interface RemoteData<T extends Entity> {

	metaData: RemoteMetadata;
	entity: T;

}
