import { EntityBase } from './entity-base.model';
import { IDBase } from './id-base.model';

export interface Bookmark extends EntityBase {

	name: string;
	title: string;
	tags: string[];
	image: string;
	urls: string[];
	clicks: number;

}

export interface Click extends IDBase {

	clicks: number;

}
