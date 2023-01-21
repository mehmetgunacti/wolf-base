import { BaseEntity } from './base-entity';
import { ID } from 'lib/constant';

export interface Wiki extends BaseEntity {

	id: string;
	title: string;
	content: string;
	tags: string;

}

// export interface WikiDTO {
// 
// 	entities: {
// 		wikis: Record<string, Wiki>;
// 	};
// 	result: ID[];
// 
// }
