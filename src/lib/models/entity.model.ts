import { IDBase, ISODateString } from './id-base.model';

export interface Entity extends IDBase {

	name: string;

}

export interface Metadata extends IDBase {

	createTime: ISODateString;
	updateTime: ISODateString;

}