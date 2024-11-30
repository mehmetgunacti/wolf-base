import { Routes } from '@angular/router';
import { setSelectedIdGuard } from './guards/project.guard';

export const FEATURE_ROUTES: Routes = [

	{

		path: 'new',
		loadComponent: () => import('pages/project-new-form.page').then(c => c.ProjectNewFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id',
		loadComponent: () => import('pages/project.page').then(c => c.ProjectPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: ':id/edit',
		loadComponent: () => import('pages/project-edit-form.page').then(c => c.ProjectEditFormPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: '',
		loadComponent: () => import('pages/projects.page').then(c => c.ProjectsPage)

	}

];
