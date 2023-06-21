import { Bookmark } from './bookmark.model';
import { IDBase } from './id-base.model';

export type WolfEntity = Bookmark;
export type PartialEntity<T extends Entity> = Omit<Partial<T>, keyof Entity>;

export interface Entity extends IDBase {

	readonly createTime?: string;
	readonly updateTime?: string;
	_updated?: boolean;
	_deleted?: boolean;
	_conflict?: boolean;

}