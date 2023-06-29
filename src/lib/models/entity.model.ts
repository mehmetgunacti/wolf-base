import { Bookmark } from './bookmark.model';
import { IDBase } from './id-base.model';

export type WolfEntity = Bookmark;
// export type PartialEntity<T extends Entity> = Omit<Partial<T>, keyof Entity>;

export interface Entity extends IDBase {

	name: string;

}

export interface MetaData extends IDBase {

	createTime: string;
	updateTime: string;

}