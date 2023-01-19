import { BaseEntity } from './base-entity';
import { ID } from 'blueprints/constant';

export interface Fast extends BaseEntity {

	id: string;
	start: Date;
	end: Date;
	goal: number;

}

// export interface FastDTO {
// 
// 	entities: {
// 		fasts: Record<string, Fast>;
// 	};
// 	result: ID[];
// 
// }
