import { Entity } from './entity.model';

export interface Note extends Entity {

	content: string;
	tags: string[];

}
