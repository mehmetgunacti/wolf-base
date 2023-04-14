import { BaseEntity } from './common.model';

export interface Bookmark extends BaseEntity {

	name: string;
	title: string;
	tags: string[];
	image: string;
	url: string;
	clicks: number;

}

export interface Click extends BaseEntity {

	clicks: number;

}
