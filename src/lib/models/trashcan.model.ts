import { KnobaTable } from 'blueprints/constants';
import { IModel } from './common.model';

export interface ITrash<T> extends IModel {

	entity: T;
	table: KnobaTable;

}
