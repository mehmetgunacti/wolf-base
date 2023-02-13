import { Model } from 'lib/models';
import { ISyncData } from './sync.model';
import { IRemoteData } from 'lib/services';

export interface IConflictData<T extends Model> extends Model {

	localData: ISyncData<T>;
	remoteData: IRemoteData<T>;
	createTime: string;

}
