import { UUID } from '@constants';
import { Entity } from './entity.model';
import { IDBase, NameBase } from './id-base.model';

export interface Bookmark extends Entity {

	title: string;
	tags: string[];
	urls: string[];
	image?: string;

}

export interface ClickedBookmark extends Bookmark {

	clicks: number;

}

export interface Click extends IDBase {

	total: number;
	current: number;

}

export interface NamedClick extends Click, NameBase { }

export interface BookmarkQueryParams {

	id: UUID | null,
	search: string | null,
	tags: string[]

}
