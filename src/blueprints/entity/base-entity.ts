import { ID } from 'blueprints/constant';

export interface BaseEntity {

	id: ID;
	created?: Date;
	modified?: Date;

}
