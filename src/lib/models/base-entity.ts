import { ID } from 'lib/constants';

export interface BaseEntity {

	id: ID;
	created?: Date;
	modified?: Date;

}
