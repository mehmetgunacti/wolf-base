import { BaseEntity } from './base-entity';
import { ID } from 'blueprints/constant';

export interface Word extends BaseEntity {

	id: string;
	term: string;
	language: string;
	pronunciation: string;
	definitions: string;
	tags: string;

}

// export interface WordDTO {
// 
// 	entities: {
// 		words: Record<string, Word>;
// 	};
// 	result: ID[];
// 
// }
