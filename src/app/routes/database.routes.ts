import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/database-page/database-page.component').then(c => c.DatabasePageComponent)

	}

];
