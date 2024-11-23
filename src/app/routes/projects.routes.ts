import { Routes } from '@angular/router';
import { setSelectedIdGuard } from './guards/project.guard';

export const FEATURE_ROUTES: Routes = [

	{

		path: ':id',
		loadComponent: () => import('pages/project.page').then(c => c.ProjectPage),
		canActivate: [ setSelectedIdGuard ]

	},
	{

		path: '',
		loadComponent: () => import('pages/projects.page').then(c => c.ProjectsPage)

	}

];
