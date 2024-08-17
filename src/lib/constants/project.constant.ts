import { NameBase } from 'lib/models';

export const TAG_OPTIONAL = 'optional';

export enum ProjectStatus {

	ongoing = 'ongoing',
	paused = 'paused',
	completed = 'completed',
	abandoned = 'abandoned'

}

export const ProjectStatusLabels: Record<string, string> = {

	[ProjectStatus.ongoing]: 'Ongoing',
	[ProjectStatus.paused]: 'On Hold',
	[ProjectStatus.completed]: 'Completed',
	[ProjectStatus.abandoned]: 'Abandoned'

}

export const PROJECT_STATUS: NameBase[] = Object.keys(ProjectStatusLabels).map(k => ({ id: k, name: ProjectStatusLabels[k] }));

export enum TaskState {

	ongoing = 'ongoing',
	paused = 'paused',
	completed = 'completed',
	abandoned = 'abandoned'

}

export const TaskStateLabels: Record<string, string> = {

	[TaskState.ongoing]: 'Ongoing',
	[TaskState.paused]: 'On Hold',
	[TaskState.completed]: 'Completed',
	[TaskState.abandoned]: 'Abandoned'

}

export const TASK_STATE: NameBase[] = Object.keys(TaskStateLabels).map(k => ({ id: k, name: TaskStateLabels[k] }));

export enum TaskPriority {

	high = 'high',
	normal = 'normal',
	low = 'low'

}

export const TaskPriorityLabels: Record<string, string> = {

	[TaskPriority.high]: 'High',
	[TaskPriority.normal]: 'Normal',
	[TaskPriority.low]: 'Low'

}

export const TASK_PRIORITIES: NameBase[] = Object.keys(TaskPriorityLabels).map(k => ({ id: k, name: TaskPriorityLabels[k] }));

export enum TaskCategory {

	bug = 'bug',
	feature = 'feature',
	improvement = 'improvement'

}

export const TaskCategoryLabels: Record<string, string> = {

	[TaskCategory.bug]: 'Bug',
	[TaskCategory.feature]: 'Feature',
	[TaskCategory.improvement]: 'Improvement'

}

export const TASK_CATEGORIES: NameBase[] = Object.keys(TaskCategoryLabels).map(k => ({ id: k, name: TaskCategoryLabels[k] }));

