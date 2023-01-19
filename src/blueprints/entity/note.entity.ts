import { BaseEntity } from './base-entity';
import { ID } from 'blueprints/constant';

export interface Note extends BaseEntity {

	id: string;
	title: string;
	content: string;
	tags: string;
	bgColor: string;

}

// export interface NoteDTO {
// 
// 	entities: {
// 		notes: Record<string, Note>;
// 	};
// 	result: ID[];
// 
// }
