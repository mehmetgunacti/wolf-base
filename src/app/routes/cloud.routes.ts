import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/cloud-page/cloud-page.component').then(c => c.CloudPageComponent)

	}

];
