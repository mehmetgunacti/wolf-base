import { UUID } from 'lib/constants';

export interface BaseEntity {

	id: UUID;
	created?: string;
	updated?: string;

}