import { Entity } from './entity.model';
import { IDBase } from './id-base.model';

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
