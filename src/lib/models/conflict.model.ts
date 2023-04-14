import { BaseEntity } from 'lib/models';

export interface IConflictData<T extends BaseEntity> extends BaseEntity {

	localData: T;
	remoteData: T;
	createTime: string;

}
