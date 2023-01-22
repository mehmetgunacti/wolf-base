import { IModel } from 'lib/models';

export interface IRemoteData<T> extends IModel {

	data: T;
	createTime: string;
	updateTime: string;

}


