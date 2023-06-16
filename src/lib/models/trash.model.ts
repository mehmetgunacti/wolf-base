import { WolfBaseEntity } from 'lib/constants';
import { WolfBaseTableName } from '../constants/database.constant';
import { IDBase } from './id-base.model';

export interface Trash extends IDBase {

	entity: WolfBaseEntity;
	table: WolfBaseTableName;

}
