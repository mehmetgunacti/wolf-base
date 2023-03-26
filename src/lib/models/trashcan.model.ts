import { WolfBaseTable } from 'lib/constants';
import { Base } from './common.model';

export interface ITrash<T> extends Base {

	entity: T;
	table: WolfBaseTable;

}
