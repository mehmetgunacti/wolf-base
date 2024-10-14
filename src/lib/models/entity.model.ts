import { UUID } from '@constants';
import { ISODateString, NameBase } from './id-base.model';

export interface Entity extends NameBase { }

export interface Metadata extends NameBase {

	createTime: ISODateString;
	updateTime: ISODateString;

}

export interface HasParentId extends Entity {

	parentId: UUID | null;

}
