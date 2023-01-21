import { ID } from 'lib/constant';

export interface BaseEntity {

	id: ID;
	created?: Date;
	modified?: Date;

}
