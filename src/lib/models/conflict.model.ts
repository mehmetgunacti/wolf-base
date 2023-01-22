import { IModel } from 'lib/models';
import { ISyncData } from './sync.model';
import { IRemoteData } from 'lib/services';

export interface IConflictData<T extends IModel> extends IModel {

	localData: ISyncData<T>;
	remoteData: IRemoteData<T>;
	createTime: string;

}
