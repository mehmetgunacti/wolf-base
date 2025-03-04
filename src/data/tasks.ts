import { TaskCategory, TaskPriority, TaskState } from '@constants/project.constant';
import { Task } from '@models/project.model';

export const demoDataTasks: Task[] = [

	{
		"id": "27a147dd-8ee8-4e0f-bc73-95c7fe2edf2d",
		"name": "improve javascript performance",
		"project": {
			"id": "cb760ec2-6a22-4ed2-8969-6a7eaa388f91",
			"name": "Web Project 1"
		},
		"description": "make use of web workers",
		"status": TaskState.completed,
		"priority": TaskPriority.low,
		"category": TaskCategory.improvement,
		"start": "2025-03-04",
		"end": "2025-03-04",
		"tags": [
			"performance"
		]
	},
	{
		"id": "2e0186a9-e7aa-48c3-9229-02e5cf57ccef",
		"name": "fix table alignments",
		"project": {
			"id": "cb760ec2-6a22-4ed2-8969-6a7eaa388f91",
			"name": "Web Project 1"
		},
		"description": null,
		"status": TaskState.ongoing,
		"priority": TaskPriority.medium,
		"category": TaskCategory.bug,
		"start": "2025-03-04",
		"end": null,
		"tags": [
			"components",
			"styling"
		]
	},
	{
		"id": "903aae8d-b4b3-482c-bac9-f3ff93f24026",
		"name": "Increase SQL statement performance",
		"project": {
			"id": "b3306999-e3be-4b69-834f-26f0e99dd3c0",
			"name": "Backend Project 1"
		},
		"description": "replace * with actual column names",
		"status": TaskState.ongoing,
		"priority": TaskPriority.medium,
		"category": TaskCategory.improvement,
		"start": "2025-03-04",
		"end": null,
		"tags": [
			"performance",
			"sql"
		]
	},
	{
		"id": "ac0005b6-b380-44f1-8b40-4beded97e3ef",
		"name": "Replace png images with svg glyphs",
		"project": {
			"id": "cb760ec2-6a22-4ed2-8969-6a7eaa388f91",
			"name": "Web Project 1"
		},
		"description": null,
		"status": TaskState.ongoing,
		"priority": TaskPriority.medium,
		"category": TaskCategory.improvement,
		"start": "2025-03-04",
		"end": null,
		"tags": [
			"styling",
			"images"
		]
	},
	{
		"id": "eff69001-0f78-4bb8-975d-a38f04e898f8",
		"name": "add endpoints for 'customer'",
		"project": {
			"id": "b3306999-e3be-4b69-834f-26f0e99dd3c0",
			"name": "Backend Project 1"
		},
		"description": "get, put and delete are missing",
		"status": TaskState.abandoned,
		"priority": TaskPriority.high,
		"category": TaskCategory.feature,
		"start": "2025-03-04",
		"end": "2025-03-04",
		"tags": [
			"api"
		]
	}

];
