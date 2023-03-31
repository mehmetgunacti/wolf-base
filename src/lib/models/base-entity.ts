import { UUID } from 'lib/constants';

export interface BaseEntity {

	id: UUID;
	created?: Date;
	modified?: Date;

}
