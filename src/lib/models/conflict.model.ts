import { EntityBase } from 'lib/models';

export interface IConflictData<T extends EntityBase> extends EntityBase {

	localData: T;
	remoteData: T;
	createTime: string;

}
