import { WolfBaseTableName } from 'lib/constants';
import { EntityBase } from './entity-base.model';

export interface ITrash<T> extends EntityBase {

	entity: T;
	table: WolfBaseTableName;

}
