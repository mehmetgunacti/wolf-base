import { IDBase, ISODateString } from './id-base.model';

export interface Entity extends IDBase {

	name: string;

}

export interface Metadata extends Entity {

	createTime: ISODateString;
	updateTime: ISODateString;

}
