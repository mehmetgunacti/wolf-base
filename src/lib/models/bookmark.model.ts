import { IModel } from './common.model';

export interface Bookmark extends IModel {

	name: string;
	title: string;
	tags: string[];
	image: string;
	url: string;
	clicks: number;

}

export interface Click extends IModel {

	clicks: number;

}
