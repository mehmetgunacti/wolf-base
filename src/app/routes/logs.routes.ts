import { Routes } from '@angular/router';

export const FEATURE_ROUTES: Routes = [

	{

		path: '',
		loadComponent: () => import('pages/logs-page/logs-page.component').then(c => c.LogsPageComponent)

	}

];
