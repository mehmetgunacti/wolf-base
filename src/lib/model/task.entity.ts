import { BaseEntity } from './base-entity';
import { ID } from 'lib/constant';

export interface Task extends BaseEntity {

	id: string;
	title: string;
	tasks: string;
	tags: string;
	bgColor: string;

}

// export interface TaskDTO {
// 
// 	entities: {
// 		tasks: Record<string, Task>;
// 	};
// 	result: ID[];
// 
// }
