import { UUID } from '@constants';
import { ISODateString, NameBase } from './id-base.model';
import { checkString, provideId } from '@utils';

export interface Entity extends NameBase { }

export interface Metadata extends NameBase {

	createTime: ISODateString;
	updateTime: ISODateString;

}

export interface HasParentId extends Entity {

	parentId: UUID | null;

}

export abstract class AbstractEntity implements Entity {

	readonly id: string;
	readonly name: string;

	protected constructor(value: Entity, createId: boolean) {

		this.id = provideId(value.id, createId);
		this.name = checkString(value.name);

	}

	abstract value(): Entity;

}
