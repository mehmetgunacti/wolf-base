import { WolfBaseTableName } from '../constants/database.constant';
import { Entity } from './entity.model';

export interface ITrash<T extends Entity<T>> {

	entity: T;
	table: WolfBaseTableName;

}
