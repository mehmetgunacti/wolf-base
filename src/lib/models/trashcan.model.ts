import { WolfBaseTableName } from 'lib/constants';
import { BaseEntity } from './common.model';

export interface ITrash<T> extends BaseEntity {

	entity: T;
	table: WolfBaseTableName;

}
