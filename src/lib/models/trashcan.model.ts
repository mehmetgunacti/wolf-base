import { WolfBaseTable } from 'lib/constants';
import { IModel } from './common.model';

export interface ITrash<T> extends IModel {

	entity: T;
	table: WolfBaseTable;

}
