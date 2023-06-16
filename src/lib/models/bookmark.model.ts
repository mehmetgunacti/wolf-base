import { Entity } from './entity.model';
import { IDBase } from './id-base.model';

export interface Bookmark extends Entity {

	name: string;
	title: string;
	tags: string[];
	urls: string[];
	clicks: number;
	image?: string;

}

export interface Click extends IDBase {

	total: number;
	current: number;

}