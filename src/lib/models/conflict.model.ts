import { Base } from 'lib/models';

export interface IConflictData<T extends Base> extends Base {

	localData: T;
	remoteData: T;
	createTime: string;

}
