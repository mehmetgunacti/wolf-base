import { Model } from 'lib/models';

export interface IRemoteData<T> extends Model {

	data: T;
	createTime: string;
	updateTime: string;

}


