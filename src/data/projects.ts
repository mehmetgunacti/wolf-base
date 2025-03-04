import { ProjectStatus } from '@constants/project.constant';
import { Project } from '@models/project.model';

export const demoDataProjects: Project[] = [

	{

		"id": "b3306999-e3be-4b69-834f-26f0e99dd3c0",
		"name": "Backend Project 1",
		"description": null,
		"tasks": [],
		"status": ProjectStatus.ongoing,
		"start": "2025-03-04",
		"end": null
	},
	{
		"id": "cb760ec2-6a22-4ed2-8969-6a7eaa388f91",
		"name": "Web Project 1",
		"description": null,
		"tasks": [],
		"status": ProjectStatus.ongoing,
		"start": "2025-03-04",
		"end": null
	}

];
