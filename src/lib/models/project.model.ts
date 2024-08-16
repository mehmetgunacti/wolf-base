import { ProjectStatus, TaskCategory, TaskPriority, TaskState } from 'lib/constants';
import { Entity } from './entity.model';
import { ISODateString, NameBase } from './id-base.model';

export interface Project extends Entity {

	status: ProjectStatus;
	start: ISODateString;
	description: string | null;
	end: ISODateString | null;
	tasks: Task[];

}

export interface Task extends NameBase {

	project: NameBase;
	description: string | null;
	status: TaskState;
	priority: TaskPriority;
	start: ISODateString;
	end: ISODateString | null;
	category: TaskCategory;
	tags: string[]

}

export interface ProjectQueryParams {

	search: string | null

}
