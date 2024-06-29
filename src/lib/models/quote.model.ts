import { Entity } from './entity.model';

export interface Quote extends Entity {

	author: string | null;
	context: string | null;

}
