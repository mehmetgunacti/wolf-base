import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/home-page/home-page.component').then(c => c.HomePageComponent)

	}

];
