import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/projects-page/projects-page.component').then(c => c.ProjectsPageComponent)

	}

];
