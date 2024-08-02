import { ProjectStatus, TaskPriority, TaskState, UUID } from 'lib/constants';
import { Entity } from './entity.model';
import { ISODateString, NameBase } from './id-base.model';

export interface Project extends Entity {

	status: ProjectStatus;
	start: ISODateString;
	description: string | null;
	end: ISODateString | null;
	taskGroups: NameBase[];

}

export interface Task extends NameBase {

	project: NameBase;
	taskGroup: NameBase;
	description: string | null;
	status: TaskState;
	priority: TaskPriority;
	optional: boolean;
	start: ISODateString;
	end: ISODateString | null;

}

export interface ProjectQueryParams {

	search: string | null

}
