import { MetaData } from "./entity.model";

export interface RemoteMetaData extends MetaData { }

export interface RemoteData<T> {

	metaData: RemoteMetaData;
	entity: T;

}