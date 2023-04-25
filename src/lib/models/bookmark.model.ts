import { EntityBase } from './entity-base.model';

export interface Bookmark extends EntityBase {

	name: string;
	title: string;
	tags: string[];
	image: string;
	url: string[];
	clicks: number;

}

export interface Click extends EntityBase {

	clicks: number;

}
