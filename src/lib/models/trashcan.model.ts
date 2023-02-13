import { WolfBaseTable } from 'lib/constants';
import { Model } from './common.model';

export interface ITrash<T> extends Model {

	entity: T;
	table: WolfBaseTable;

}
